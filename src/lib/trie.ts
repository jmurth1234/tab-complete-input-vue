/**
 * Copyright (C) 2012 Paul Thurlow
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

interface Options {
  enableCache: boolean;
  insertOrder: boolean;
  returnRoot: boolean;
  [key: string]: any;
}

interface Methods {
  insert: Function;
  sort: Function;
  clip: Function;
  copy: Function;
  merge: Function;
  [key: string]: any;
}

const defaultOptions: Options = {
  enableCache: true,
  insertOrder: false,
  returnRoot: false
};

interface Data {
  $d?: string | any;
  $s?: string;
  [key: string]: any;
}

interface Ordered {
  d?: string;
  o?: number;
}

function isOrdered(data: Ordered | any): data is Ordered {
  return (data as Ordered).d !== undefined && (data as Ordered).o !== undefined;
}

/**
 * @decription Trie class for saving data by keywords accessible through
 *   word prefixes
 * @class
 * @version 0.1.5
 */
class TrieJS {
  private options: Options | Methods = defaultOptions;
  private root: Data = {};
  private index = 0;

  constructor(opts?: Options) {
    // mixin optional override options
    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        this.options[key] = opts[key];
      }
    }

    if (typeof this.options.insert != "function") {
      this.options.insert = (target: any[], item: string) => {
        // if maintaining insert ordering add a order index on insert
        let data: Ordered | string;
        if (this.options.insertOrder && !isOrdered(item)) {
          data = { d: item, o: this.index++ };
        }
        if (target && target.length) {
          target.push(item);
        } else {
          target = [item];
        }
        return target;
      };
    }

    if (typeof this.options.sort != "function") {
      if (!this.options.insertOrder) {
        this.options.sort = function(this: Data[]) {
          this.sort();
        };
      } else if (this.options.insertOrder) {
        this.options.sort = function(this: Data[]) {
          this.sort((a, b) => {
            if (a.o === undefined || b.o === undefined) {
              return 0;
            }

            return a.o - b.o;
          });
        };
      }
    }

    if (typeof this.options.clip != "function") {
      this.options.clip = function(this: Data[], max: number) {
        if (this.length > max) {
          this.splice(max, this.length - max);
        }
      };
    }

    if (typeof this.options.copy != "function") {
      this.options.copy = (data: any[]) => data.slice(0);
    }

    if (typeof this.options.merge != "function") {
      this.options.merge = (target: Data[], data: any, word: string) => {
        for (let i = 0, ii = data.length; i < ii; i++) {
          target = this.options.insert.call(this, target, data[i]);
          this.options.sort.call(target, word);
        }
        return target;
      };
    }
  }

  /*-------------------------------------------------------------------------
    * Private Functions
    -------------------------------------------------------------------------*/

  /**
   * @description Add data to the current nodes cache
   * @param curr {Object} current node in trie
   * @param data {Object} Data to add to the cache
   * @private
   */
  _addCacheData(curr: Data, data: Data) {
    if (
      (this.root === curr && !this.options.returnRoot) ||
      this.options.enableCache === false
    ) {
      return false;
    }
    if (!curr.$d) {
      curr.$d = {};
    }

    curr.$d = this.options.insert.call(this, curr.$d, data);
    this.options.sort.call(curr.$d);
    return true;
  }

  /**
   * @description Adds the remainder of a word to a subtree
   * @param suffix {String} the remainder of a word
   * @param data {Object} data to add at suffix
   * @param curr {Object} current node in the trie
   * @private
   */
  _addSuffix(suffix: string, data: Data, curr: Data) {
    const letter = suffix.charAt(0);
    const nextSuffix = suffix.substring(1) || null;
    const opts: Data = { $d: {} };
    if (nextSuffix) {
      opts.$s = nextSuffix;
    }
    if (typeof curr[letter] === "undefined") {
      curr[letter] = opts;
    } else if (typeof curr[letter].$d === "undefined") {
      curr[letter].$d = {};
      if (nextSuffix && typeof curr[letter].$s === "undefined") {
        curr[letter].$s = nextSuffix;
      }
    }
    curr[letter].$d = this.options.insert.call(this, curr[letter].$d, data);
    this.options.sort.call(curr[letter].$d);
  }

  /**
   * @description Move data from current location to new suffix position
   * @param suffix {String} the remainder of a word
   * @param data {Object} data currently stored to be moved to suffix ending
   * @param curr {Object} current node in the trie
   * @private
   */
  _moveSuffix(suffix: string, data: Data, curr: Data) {
    const letter = suffix.charAt(0);
    const nextSuffix = suffix.substring(1) || null;
    const opts: Data = { $d: {} };
    if (nextSuffix) {
      opts.$s = nextSuffix;
    }
    if (typeof curr[letter] === "undefined") {
      curr[letter] = opts;
    }
    curr[letter].$d = this.options.copy(data);
  }

  /**
   * @description Get data from a given node, either in the cache
   *   or by parsing the subtree
   * @param node {Object} The node to get data from
   * @return {Array|Object} data results
   */
  _getDataAtNode(node: Data, word: string) {
    let data;

    if (this.options.enableCache) {
      this.options.sort.call(node.$d, word);
      data = node.$d;
    } else {
      data = this._getSubtree(node, word);
    }
    if (this.options.insertOrder) {
      data = this._stripInsertOrder(data);
    }
    return data ? this.options.copy(data) : undefined;
  }

  /**
   * @description Remove the outer data later that stores insert order
   * @param data {Object} The data with insert order object wrapper
   * @return {Array} data results without insert order wrapper
   */
  _stripInsertOrder(data: Ordered[]) {
    if (typeof data == "undefined") {
      return;
    }
    const temp = [];
    for (let i = 0, ii = data.length; i < ii; i++) {
      temp.push(data[i].d);
    }
    return temp;
  }

  /**
   * @description Get the subtree data of a trie traversing depth first
   * @param curr {Object} current node in the trie to get data under
   * @return {Object} data from the subtree
   */
  _getSubtree(curr: Data, word: string) {
    let res: Data = [];
    const nodeArray = [curr];
    let node;
    while ((node = nodeArray.pop())) {
      for (const newNode in node) {
        if (node.hasOwnProperty(newNode)) {
          if (newNode == "$d") {
            res = this.options.merge.call(this, res, node.$d, word);
          } else if (newNode != "$s") {
            nodeArray.push(node[newNode]);
          }
        }
      }
    }
    return res;
  }

  /*-------------------------------------------------------------------------
    * Public Functions
    -------------------------------------------------------------------------*/

  /**
   * @description Adds a word into the trie
   * @param word {String} word to add
   * @param data {Object} data to store under given term
   */
  add(word: string, data?: any) {
    if (typeof word != "string") {
      return false;
    }
    if (arguments.length == 1) {
      data = word;
    }
    word = word.toLowerCase();

    let curr = this.root;

    for (let i = 0, ii = word.length; i < ii; i++) {
      const letter = word.charAt(i);
      // No letter at this level
      if (!curr[letter]) {
        // Current level has a suffix already so push suffix lower in trie
        if (curr.$s) {
          if (curr.$s == word.substring(i)) {
            // special case where word exists already, so we avoid breaking
            // up the substring and store both at the top level
            if (!this._addCacheData(curr, data)) {
              curr.$d = this.options.insert.call(this, curr.$d, data);
              this.options.sort.call(curr.$d);
            }
            break;
          }
          this._moveSuffix(curr.$s, curr.$d, curr);
          delete curr.$s;
          if (this.options.enableCache === false) {
            delete curr.$d;
          }
        }
        // Current level has no sub letter after building suffix
        if (!curr[letter]) {
          this._addSuffix(word.substring(i), data, curr);
          this._addCacheData(curr, data);
          break;
        }
        // add to the cache at the current node level in the trie
        this._addCacheData(curr, data);
        // if its the end of a word push possible suffixes at this node down
        // and add data to cache at the words end
        if (i == ii - 1) {
          if (curr[letter].$s) {
            this._moveSuffix(curr[letter].$s, curr[letter].$d, curr[letter]);
            delete curr[letter].$s;
            if (this.options.enableCache === false) {
              delete curr[letter].$d;
            }
            // insert new data at current end of word node level
            this._addSuffix(letter, data, curr);
          } else {
            // either add to cache or just add the data at end of word node
            if (!this._addCacheData(curr[letter], data)) {
              this._addSuffix(letter, data, curr);
            }
          }
        }
        curr = curr[letter];
      }
      // There is a letter and we are at the end of the word
      else if (i == ii - 1) {
        this._addCacheData(curr, data);
        // either add to cache at the end of the word or just add the data
        if (!this._addCacheData(curr[letter], data)) {
          this._addSuffix(letter, data, curr);
        }
      }
      // There is a letter so traverse lower into the trie
      else {
        this._addCacheData(curr, data);
        curr = curr[letter];
      }
    }
  }

  /**
   * @description see if a word has been added to the trie
   * @param word {String} word to search for
   * @return {Boolean} whether word exists or not
   */
  contains(word: string) {
    if (typeof word !== "string" || word == "") {
      return false;
    }
    word = word.toLowerCase();

    let curr = this.root;
    for (let i = 0, ii = word.length; i < ii; i++) {
      const letter = word.charAt(i);
      if (!curr[letter]) {
        if (curr.$s && curr.$s === word.substring(i)) {
          return true;
        } else {
          return false;
        }
      } else {
        curr = curr[letter];
      }
    }
    return curr.$d && typeof curr.$s === "undefined" ? true : false;
  }

  /**
   * @description Get the data for a given prefix of a word
   * @param prefix {String} string of the prefix of a word
   * @return {Array|Object} data for the given prefix
   */
  find(prefix: string) {
    if (typeof prefix !== "string") {
      return undefined;
    }
    if (prefix == "" && !this.options.returnRoot) {
      return undefined;
    }
    prefix = prefix.toLowerCase();

    let curr = this.root;
    for (let i = 0, ii = prefix.length; i < ii; i++) {
      const letter = prefix.charAt(i);
      if (!curr[letter]) {
        if (curr.$s && curr.$s.indexOf(prefix.substring(i)) == 0) {
          return this._getDataAtNode(curr, prefix);
        } else {
          return undefined;
        }
      } else {
        curr = curr[letter];
      }
    }
    return this._getDataAtNode(curr, prefix);
  }
}

export default Triejs;
