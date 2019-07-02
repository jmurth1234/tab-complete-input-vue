import TrieJS from './lib/trie'

export default {
  name: 'tab-complete-input',
  data() {
    return {
      trie: new TrieJS(),
      position: 0,
      wordPos: 0,
      index: 0,
      words: [],
      word: '',
      dynamicData: false,
      possible: false,
      saved: false,
      localValue: this.value
    }
  },
  render(h) {
    var self = this
    return h('input', {
      ref: 'input',
      attrs: {
        ...self.$props
      },
      domProps: {
        value: self.value
      },
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: self.localValue,
          expression: 'value'
        }
      ],
      on: {
        ...self.$listeners,
        keydown: self.$listeners.keydown
          ? [self.tabComplete, self.$listeners.keydown]
          : self.tabComplete,
        input(event) {
          self.localValue = event.target.value
          self.$emit('input', event.target.value)
        }
      }
    })
  },
  created() {
    this.dynamicData = this.dataSource instanceof Function

    if (!this.dynamicData) {
      this.setData(this.dataSource)
    }
  },
  props: {
    dataSource: {
      default: () => []
    },
    format: {
      default: (word, prev, pos) => ({ word, prev, pos }),
      type: Function
    },
    value: {
      default: '',
      type: String
    }
  },
  watch: {
    // whenever dataSource changes, this function will run
    dataSource(data) {
      this.dynamicData = data instanceof Function

      if (!this.dynamicData) {
        this.setData(data)
      }
    }
  },
  methods: {
    setData(array) {
      this.trie = new TrieJS()
      array.forEach(element => {
        this.trie.add(element)
      })
    },

    async tabComplete(e) {
      if (e && e.keyCode !== 9) {
        this.saved = false
        this.index = 0

        return
      }
      if (!this.saved) {
        this.position = this.getCursorPos()
        const newValue =
          this.localValue.slice(0, this.position) +
          ' ' +
          this.localValue.slice(this.position)

        this.words = newValue.split(' ')
        var lcount = 0
        for (var i = 0; i < this.words.length; i++) {
          var w = this.words[i]
          lcount += w.length + 1
          if (lcount >= this.position) {
            this.word = this.words[i]
            this.wordPos = i
            break
          }
        }

        if (this.word != '' && e) {
          e.preventDefault()
        }

        if (this.dynamicData) {
          let data = this.dataSource(this.word, this.wordPos)
          var array = await data
          this.setData(array)
        }

        this.saved = true
        this.possible = this.trie.find(this.word)
      } else {
        this.index++
      }

      if (this.possible && this.index >= this.possible.length) {
        this.index = 0
      }

      if (this.possible) {
        if (e) e.preventDefault()
        let dupe = this.words
        let completion = this.possible[this.index]
        let prev = ''

        if (dupe.length > 1) {
          prev = dupe[this.wordPos - 1]
        }

        let res = this.format(completion, prev, this.wordPos)
        dupe[this.wordPos] = res.word
        if (res.prev) dupe[this.wordPos - 1] = res.prev

        let newPos = this.words.slice(0, this.wordPos + 1).join(' ').length
        this.localValue = dupe.join(' ')
        this.localValue =
          this.localValue.slice(0, newPos) + this.localValue.slice(newPos + 1)
        this.updateValue(this.localValue)
        this.$nextTick(() => this.selectRange(newPos, newPos))
      }
    },

    updateValue(value) {
      this.localValue = value
      this.$emit('input', value)
    },

    selectRange(start, end) {
      this.$el.focus()
      this.$el.setSelectionRange(start, end)
    },

    getCursorPos() {
      return this.$el.selectionStart
    }
  }
}
