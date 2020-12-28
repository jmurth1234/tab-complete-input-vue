import TrieJS from "./trie";
import { PropType } from 'vue';
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
declare const _default: import("vue").DefineComponent<{
    dataSource: {
        default: () => string[];
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
    getCompletions(e?: KeyboardEvent): Promise<void>;
    selectCompletion(index?: number): void;
    emitEvents(e?: KeyboardEvent): void;
    handleTabPressed(e?: KeyboardEvent): Promise<void>;
    tabComplete(e: KeyboardEvent): Promise<void>;
    typeaheadCompletion(): Promise<void>;
    updateValue(value: string): void;
    selectRange(start: number, end: number): void;
    getCursorPos(): any;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("tab-failed" | "tab-success" | "tab-ended" | "selection-changed" | "update:modelValue")[], "tab-failed" | "tab-success" | "tab-ended" | "selection-changed" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    dataSource: string[];
    format: (word: string, prev: string, pos: number) => FormatResult;
    modelValue: string;
    startCompletionChar: string;
} & {}>, {
    dataSource: string[];
    format: (word: string, prev: string, pos: number) => FormatResult;
    modelValue: string;
    startCompletionChar: string;
}>;
export default _default;
