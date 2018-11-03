<template>
  <input type="text" v-on:keydown.tab="tabComplete" v-on:keydown="reset" v-bind:value="value" v-bind="$props"
         v-on:input="updateValue($event.target.value)" />
</template>

<script>
import TrieJS from "triejs";

export default {
  name: "tab-complete-input",
  data () {
    return {
      trie: {},
      position: 0,
      wordPos: 0,
      index: 0,
      words: [],
      word: "",
      dynamicData: false,
      possible: false,
      saved: false
    };
  },
  created () {
    this.dynamicData = this.dataSource instanceof Function;

    if (!this.dynamicData) {
      this.setData(this.dataSource);
    }
  },
  props: {
    dataSource: {
      default: [],
    },
    format: {
      default: function (val, prev, pos) { return {word: val, prev: prev } },
      type: Function
    }, 
    value: {
      default: "", 
      type: String
    }
  },
  methods: {
    setData (array) {
      this.trie = new TrieJS();
      array.forEach(element => {
        this.trie.add(element);
      });
    },

    async tabComplete (e) {
      if (!this.saved) {
        this.position = this.getCursorPos();
        const newValue = this.value.slice(0, this.position) + " " + this.value.slice(this.position);
        
        this.words = newValue.split(" ");
        var lcount = 0;
        for (var i = 0; i < this.words.length; i++) {
          var w = this.words[i];
          lcount += w.length + 1;
          if (lcount >= this.position) {
            this.word = this.words[i];
            this.wordPos = i;
            break;
          }
        }

        if (this.word != "" && e) {
          e.preventDefault();
        }

        if (this.dynamicData) {
          let data = this.dataSource(this.word, this.wordPos);
          var array = await data;
          this.setData(array);
        }

        this.saved = true;
        this.possible = this.trie.find(this.word);
      } else {
        this.index++;
      }

      if (this.possible && this.index >= this.possible.length) {
        this.index = 0;
      }

      if (this.possible) {
        if (e) e.preventDefault();
        let dupe = this.words;
        let completion = this.possible[this.index];
        let prev = "";

        if (dupe.length > 1) {
          prev = dupe[this.wordPos - 1];
        }

        let res = this.format(completion, prev, this.wordPos);
        dupe[this.wordPos] = res.word;
        if (res.prev) dupe[this.wordPos - 1] = res.prev;

        let newPos = this.words.slice(0, this.wordPos + 1).join(" ").length;
        this.value = dupe.join(" ");
        this.value = this.value.slice(0, newPos) + this.value.slice(newPos + 1)
        this.updateValue(this.value);
        this.selectRange(newPos, newPos);
      }
    },

    reset (e) {
      if (e.keyCode !== 9) {
        this.saved = false;
        this.index = 0;
      }
    },
    
    updateValue (value) {
      this.$emit('input', value)
    }, 

    selectRange (start, end) {
      this.$el.focus();
      this.$el.setSelectionRange(start, end);
    },

    getCursorPos () {
      return this.$el.selectionStart;
    }
  }
};
</script>
