import Vue from 'vue';
interface FormatResult {
    word: String;
    prev: String;
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue, any, {
    setData(array: string[]): void;
    tabComplete(e: KeyboardEvent): Promise<void>;
    updateValue(value: string): void;
    selectRange(start: number, end: number): void;
    getCursorPos(): any;
}, unknown, {
    dataSource: never[];
    format: FormatResult | ((word: String, prev: String, pos: Number) => FormatResult);
    value: string;
}>;
export default _default;
