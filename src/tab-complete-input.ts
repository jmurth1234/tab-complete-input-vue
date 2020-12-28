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

  emits: [
    "tab-failed",
    "tab-success",
    "tab-ended",
    "selection-changed",
    "update:modelValue"
  ],

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
      isTypeahead: false
    } as Data;
  },

  render() {
    const onKeydown: any[] = [this.tabComplete];

    if (typeof this.$attrs.onKeydown === "function") {
      onKeydown.push(this.$attrs.onKeydown);
    }

    if (Array.isArray(this.$attrs.onKeydown)) {
      onKeydown.push(...this.$attrs.onKeydown);
    }

    return h("input", {
      ref: "input",
      ...this.$props,
      ...this.$attrs,
      value: this.modelValue,
      "onUpdate:modelValue": (value: string) => (this.localValue = value),
      onKeydown,
      onInput: (event: InputEvent) => {
        const elem = event.target as HTMLInputElement;
        this.updateValue(elem.value);
        this.typeaheadCompletion();
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
      default: (): string[] => []
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

    async getCompletions(e?: KeyboardEvent) {
      if (isDataFunction(this.dataSource)) {
        const data = this.dataSource(this.word, this.wordPos);
        const array = await data;
        this.setData(array);
      }

      this.saved = true;
      this.possible = this.trie.find(this.word);

      this.emitEvents(e);
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

      this.$emit("selection-changed", event);
    },

    emitEvents(e?: KeyboardEvent) {
      const event: CompleteEvent = {
        original: e,
        completions: this.possible,
        word: this.word,
        current: this.index
      };

      if (!this.possible) {
        this.$emit(this.saved ? "tab-failed" : "tab-ended", event);
      } else {
        this.$emit("tab-success", event);
      }
    },

    async handleTabPressed(e?: KeyboardEvent) {
      if (!this.saved) {
        e?.preventDefault();
        await this.getCompletions(e);
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
    },

    async tabComplete(e: KeyboardEvent) {
      if (!e) return;
      this.getCurrentWord();

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
      if (this.word.startsWith(this.startCompletionChar)) {
        this.word = this.word.replace(this.startCompletionChar, "");
        await this.getCompletions();

        this.isTypeahead = true;

        return;
      }

      if (this.isTypeahead) {
        await this.getCompletions();

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
