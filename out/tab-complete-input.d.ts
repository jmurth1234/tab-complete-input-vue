import TrieJS from "./trie";
import { PropType } from "vue";
interface FormatResult {
    word: string;
    prev: string;
}
declare const dataFunction: (word: string, pos: number) => Promise<string[]>;
declare const formatFunction: (word: string, prev: string, pos: number) => FormatResult;
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
export declare type FormatFunction = typeof formatFunction;
export declare type DataFunction = typeof dataFunction;
declare type DataFunctionProp = string[] | DataFunction;
declare const _default: import("vue").DefineComponent<{
    dataSource: {
        type: PropType<DataFunctionProp>;
        default: () => any[];
    };
    format: {
        type: PropType<(word: string, prev: string, pos: number) => FormatResult>;
        default: (word: string, prev: string, pos: number) => FormatResult;
    };
    modelValue: {
        default: string;
    };
    startCompletionChar: {
        default: string;
    };
}, unknown, Data, {}, {
    setData(array: string[]): void;
    getCurrentWord(): void;
    getCompletions(): Promise<void>;
    selectCompletion(index?: number): void;
    emitEvents(e?: KeyboardEvent): void;
    handleTabPressed(e?: KeyboardEvent): Promise<void>;
    tabComplete(e: KeyboardEvent): Promise<void>;
    typeaheadCompletion(): Promise<void>;
    updateValue(value: string): void;
    selectRange(start: number, end: number): void;
    getCursorPos(): any;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("tabFailed" | "tabSuccess" | "selectionChanged" | "update:modelValue")[], "tabFailed" | "tabSuccess" | "selectionChanged" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    dataSource: DataFunctionProp;
    format: (word: string, prev: string, pos: number) => FormatResult;
    modelValue: string;
    startCompletionChar: string;
} & {}>, {
    dataSource: DataFunctionProp;
    format: (word: string, prev: string, pos: number) => FormatResult;
    modelValue: string;
    startCompletionChar: string;
}>;
export default _default;
