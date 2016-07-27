import { InjectType, ModuleDependencies } from './util';
export declare function Directive(directiveOptions: {
    selector: string;
    directives?: InjectType;
    scope?: boolean | Object;
    template?: string | Function;
    templateNamespace?: string;
    templateUrl?: string | Function;
    transclude?: boolean | string | {
        [slot: string]: string;
    };
    require?: string | string[] | {
        [controller: string]: string;
    };
    bindToController?: boolean | Object;
    restrict?: string;
    controllerAs?: string;
    compile?: ng.IDirectiveCompileFn;
    link?: ng.IDirectiveLinkFn | ng.IDirectivePrePost;
    controller: Function;
}, params?: {
    $inject?: InjectType;
    moduleName?: string;
    moduleDependencies?: ModuleDependencies;
}): (target: Function & {
    directiveOptions?: {
        bindings?: {
            [binding: string]: string;
        };
    };
    moduleName?: string;
    $inject?: string[];
    injections?: {
        [injected: string]: string;
    };
}) => void;
