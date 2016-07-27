import { InjectType, ModuleDependencies } from './util';
/**
 * @ngdoc decorator
 *
 * @description @Component declares an Angular 1 component and a module.
 *
 * Usage:
 *
 * @Component({
 *  selector: 'my-component',
 *  directives: […],
 *  templateUrl: '…',
 *  bindings: {
 *   …
 *  }
 * })
 * export class MyComponent {…}
 */
export declare function Component(componentOptions: {
    selector: string;
    directives?: InjectType;
    templateUrl?: string | Function;
    template?: string | Function;
    transclude?: boolean | string | {
        [slot: string]: string;
    };
    require?: {
        [controller: string]: string;
    };
    bindings?: {
        [binding: string]: string;
    };
    controller: Function & {
        $inject?: string[];
    };
}, params?: {
    $inject?: InjectType;
    moduleName?: string;
    moduleDependencies?: ModuleDependencies;
}): (target: Function & {
    componentOptions?: {
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
