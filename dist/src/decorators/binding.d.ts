export declare type EventEmitter<T> = (params: T) => any;
export declare function EventBinding(binding?: string): (target: Function & {
    constructor: Function & {
        componentOptions?: {
            bindings?: {
                [binding: string]: string;
            };
        };
    };
}, name: string) => void;
export declare var Output: typeof EventBinding;
export declare function InputString(binding?: string): (target: Function & {
    constructor: Function & {
        componentOptions?: {
            bindings?: {
                [binding: string]: string;
            };
        };
    };
}, name: string) => void;
export declare function Input(binding?: string): (target: Function & {
    constructor: Function & {
        componentOptions?: {
            bindings?: {
                [binding: string]: string;
            };
        };
    };
}, name: string) => void;
