import Vue from 'vue';
interface FormatResult {
    word: String;
    prev: String;
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    trie: any;
    position: number;
    wordPos: number;
    index: number;
    words: any[];
    word: string;
    dynamicData: boolean;
    possible: boolean;
    saved: boolean;
    localValue: string;
}, {
    setData(array: any): void;
    tabComplete(e: any): Promise<void>;
    updateValue(value: any): void;
    selectRange(start: any, end: any): void;
    getCursorPos(): any;
}, unknown, {
    dataSource: any[];
    format: FormatResult | ((word: String, prev: String, pos: Number) => FormatResult);
    value: string;
}>;
export default _default;
