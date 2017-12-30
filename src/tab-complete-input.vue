<template>
  <input type="text" v-on:keydown="handleKey" v-bind:value="value"
         v-on:input="updateValue($event.target.value)" />
</template>

<script>
import TrieJS from "triejs";

export default {
  name: "tab-complete-input",
  data() {
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
  created: function() {
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
    setData: function (array) {
      this.trie = new TrieJS();
      array.forEach(element => {
        this.trie.add(element);
      });
    },
    handleKey: function(e) {
      if (e.keyCode === 9) {
        console.log("tab pressed");

        if (!this.saved) {
          this.position = this.getCursorPos();

          if (this.dynamicData) {
            this.setData(this.dataSource());
          }

          this.words = this.value.split(" ");
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

          this.saved = true;
          this.possible = this.trie.find(this.word);
        } else {
          this.index++;
        }

        if (this.possible && this.index >= this.possible.length) {
          this.index = 0;
        }

        if (this.possible) {
          e.preventDefault();
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
        }
      } else {
        this.saved = false;
        this.index = 0;
      }
    },

    updateValue: function (value) {
      this.$emit('input', value)
    }, 

    selectRange: function (start, end) {
      this.$el.focus();
      this.$el.setSelectionRange(start, end);
    },

    getCursorPos: function() {
      return this.$el.selectionStart;
    }
  }
};
</script>
