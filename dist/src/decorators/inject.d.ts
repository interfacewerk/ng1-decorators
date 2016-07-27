export declare function Inject(injected?: string): (targetClass: {
    constructor: Function & {
        injections?: {
            [injectedString: string]: string;
        };
        $inject: string[];
    };
}, propertyName: string) => void;
