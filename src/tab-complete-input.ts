import TrieJS from "./trie";
import { defineComponent, h, PropType } from "vue";

interface FormatResult {
  word: string;
  prev: string;
}

const dataFunction = async function(
  word: string,
  pos: number
): Promise<string[]> {
  return [];
};

const formatFunction = (
  word: string,
  prev: string,
  pos: number
): FormatResult => ({ word, prev });

interface Data {
  trie: TrieJS;
  position: number;
  wordPos: number;
  index: number;
  words: string[];
  word: string;
  possible: string[] | false;
  saved: boolean;
  localValue: string;
  isTypeahead: boolean;
}

export interface CompleteEvent {
  original?: KeyboardEvent;
  completions: string[] | false;
  current: number;
  word: string;
}

export type FormatFunction = typeof formatFunction;
export type DataFunction = typeof dataFunction;

type DataFunctionProp = string[] | DataFunction;

function isDataFunction(data: DataFunctionProp): data is DataFunction {
  return !!(data as DataFunction).bind;
}

export default defineComponent({
  name: "tab-complete-input",

  emits: ["tabFailed", "tabSuccess", "selectionChanged", "update:modelValue"],

  data() {
    return {
      trie: new TrieJS(),
      position: 0,
      wordPos: 0,
      index: 0,
      words: [],
      word: "",
      possible: false,
      saved: false,
      localValue: this.modelValue,
      isTypeahead: true
    } as Data;
  },

  render() {
    const self = this;

    return h("input", {
      ref: "input",
      ...this.$props,
      ...this.$attrs,
      value: self.localValue,
      "onUpdate:modelValue": (value: string) => (self.localValue = value),
      onKeydown: this.$attrs.keydown
        ? [this.tabComplete, this.$attrs.keydown]
        : this.tabComplete,
      onInput(event: InputEvent) {
        const elem = event.target as HTMLInputElement;
        self.updateValue(elem.value);
        self.typeaheadCompletion();
      }
    });
  },

  created() {
    if (!isDataFunction(this.dataSource)) {
      this.setData(this.dataSource);
    }
  },

  props: {
    dataSource: {
      type: Object as PropType<DataFunctionProp>,
      default: () => []
    },
    format: {
      type: Function as PropType<typeof formatFunction>,
      default: formatFunction
    },
    modelValue: {
      default: ""
    },
    startCompletionChar: {
      default: "@"
    }
  },

  watch: {
    // whenever dataSource changes, this function will run
    dataSource(data: DataFunctionProp) {
      if (!isDataFunction(data)) {
        this.setData(data);
      }
    }
  },

  methods: {
    setData(array: string[]) {
      this.trie = new TrieJS();
      array.forEach(element => {
        this.trie.add(element);
      });
    },

    getCurrentWord() {
      this.position = this.getCursorPos();
      const newValue =
        this.localValue.slice(0, this.position) +
        " " +
        this.localValue.slice(this.position);

      this.words = newValue.split(" ");
      let lcount = 0;
      for (let i = 0; i < this.words.length; i++) {
        const w = this.words[i];
        lcount += w.length + 1;
        if (lcount >= this.position) {
          this.word = this.words[i];
          this.wordPos = i;
          break;
        }
      }
    },

    async getCompletions() {
      if (isDataFunction(this.dataSource)) {
        const data = this.dataSource(this.word, this.wordPos);
        const array = await data;
        this.setData(array);
      }

      this.saved = true;
      this.possible = this.trie.find(this.word);
    },

    selectCompletion(index?: number) {
      if (!this.possible) return;

      if (index !== undefined && index < this.possible.length) {
        this.index = index;
      }

      this.isTypeahead = false;

      const dupe = this.words;
      const completion = this.possible[this.index];
      let prev = "";

      if (dupe.length > 1) {
        prev = dupe[this.wordPos - 1];
      }

      const res = this.format(completion, prev, this.wordPos);
      dupe[this.wordPos] = res.word;
      if (res.prev) dupe[this.wordPos - 1] = res.prev;

      const newPos = this.words.slice(0, this.wordPos + 1).join(" ").length;
      this.localValue = dupe.join(" ");
      this.localValue =
        this.localValue.slice(0, newPos) + this.localValue.slice(newPos + 1);
      this.updateValue(this.localValue);
      this.$nextTick(() => this.selectRange(newPos, newPos));

      const event: CompleteEvent = {
        completions: this.possible,
        word: this.word,
        current: this.index
      };

      this.$emit("selectionChanged", event);
    },

    emitEvents(e?: KeyboardEvent) {
      const event: CompleteEvent = {
        original: e,
        completions: this.possible,
        word: this.word,
        current: this.index
      };

      if (!this.possible) {
        this.$emit("tabFailed", event);
      } else {
        this.$emit("tabSuccess", event);
      }
    },

    async handleTabPressed(e?: KeyboardEvent) {
      if (!this.saved) {
        this.getCurrentWord();

        e?.preventDefault();

        await this.getCompletions();
      } else {
        this.index++;
      }

      if (this.possible) {
        e?.preventDefault();

        if (this.index >= this.possible.length) {
          this.index = 0;
        }

        this.selectCompletion();
      }

      this.emitEvents(e);
    },

    async tabComplete(e: KeyboardEvent) {
      if (!e) return;

      if (e.key === "tab" || e.keyCode === 9) {
        await this.handleTabPressed(e);
        return;
      }

      if (!this.isTypeahead) {
        this.saved = false;
        this.possible = false;
        this.index = 0;

        this.emitEvents(e);
      }
    },

    async typeaheadCompletion() {
      this.getCurrentWord();

      if (this.word.startsWith(this.startCompletionChar)) {
        this.word = this.word.replace(this.startCompletionChar, "");
        await this.getCompletions();
        this.emitEvents();

        this.isTypeahead = true;

        return;
      }

      if (this.isTypeahead) {
        await this.getCompletions();
        this.emitEvents();

        if (!this.possible) {
          this.isTypeahead = false;
        }
      }
    },

    updateValue(value: string) {
      this.localValue = value;
      this.$emit("update:modelValue", value);
    },

    selectRange(start: number, end: number) {
      this.$el.focus();
      this.$el.setSelectionRange(start, end);
    },

    getCursorPos() {
      return this.$el.selectionStart;
    }
  }
});
