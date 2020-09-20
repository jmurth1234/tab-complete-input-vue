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
/**
 * @decription Trie class for saving data by keywords accessible through
 *   word prefixes
 * @class
 * @version 0.1.5
 */
declare class TrieJS {
    private options;
    private root;
    private index;
    constructor(opts?: Options);
    /**
     * @description Add data to the current nodes cache
     * @param curr {Object} current node in trie
     * @param data {Object} Data to add to the cache
     * @private
     */
    private _addCacheData;
    /**
     * @description Adds the remainder of a word to a subtree
     * @param suffix {String} the remainder of a word
     * @param data {Object} data to add at suffix
     * @param curr {Object} current node in the trie
     * @private
     */
    private _addSuffix;
    /**
     * @description Move data from current location to new suffix position
     * @param suffix {String} the remainder of a word
     * @param data {Object} data currently stored to be moved to suffix ending
     * @param curr {Object} current node in the trie
     * @private
     */
    private _moveSuffix;
    /**
     * @description Get data from a given node, either in the cache
     *   or by parsing the subtree
     * @param node {Object} The node to get data from
     * @return {Array|Object} data results
     */
    private _getDataAtNode;
    /**
     * @description Remove the outer data later that stores insert order
     * @param data {Object} The data with insert order object wrapper
     * @return {Array} data results without insert order wrapper
     */
    private _stripInsertOrder;
    /**
     * @description Get the subtree data of a trie traversing depth first
     * @param curr {Object} current node in the trie to get data under
     * @return {Object} data from the subtree
     */
    private _getSubtree;
    /**
     * @description Adds a word into the trie
     * @param word {String} word to add
     * @param data {Object} data to store under given term
     */
    add(word: string, data?: any): false | undefined;
    /**
     * @description see if a word has been added to the trie
     * @param word {String} word to search for
     * @return {Boolean} whether word exists or not
     */
    contains(word: string): boolean;
    /**
     * @description Get the data for a given prefix of a word
     * @param prefix {String} string of the prefix of a word
     * @return {Array|Object} data for the given prefix
     */
    find(prefix: string): any;
}
export default TrieJS;
