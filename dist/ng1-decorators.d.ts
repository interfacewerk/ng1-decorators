declare module "decorators/property" {
    export function Property(target: Object, name: string): void;
}
declare module "decorators/binding" {
    export type EventEmitter<T> = (params: T) => any;
    export function EventBinding(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
    export var Output: typeof EventBinding;
    export function InputString(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
    export function Input(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
}
declare module "decorators/util" {
    export type ModuleType2 = {
        moduleName?: string;
    };
    export type ServiceType2 = {
        service?: string;
    };
    export type InjectType = Array<string | {}>;
    export type ModuleDependencies = Array<ModuleDependency>;
    export type ModuleDependency = string | ModuleType2;
    export function transformModuleDependenciesIntoArrayOfString(deps: ModuleDependencies): string[];
    export function makeInject($inject: InjectType): string[];
    export function addMissingDependenciesFrom$Inject(moduleDependencies: ModuleDependencies, optionalInjects: InjectType): (string | {
        moduleName?: string;
    })[];
    export function directiveNormalize(name: string): string;
    export function camelCase(name: string): string;
}
declare module "decorators/module" {
    import { ModuleDependencies } from "decorators/util";
    export function AngularModule(moduleName: string, moduleDependencies?: ModuleDependencies): ng.IModule;
    export function Module(moduleName: string, moduleDependencies?: ModuleDependencies): (target: Function & {
        moduleName?: string;
    }) => void;
    export function makeAngularModuleIfNecessary(moduleNameIfNotProvided: string, target: Function & {
        moduleName?: string;
    }, params: {
        moduleName?: string;
        moduleDependencies?: ModuleDependencies;
    }): ng.IModule;
}
declare module "decorators/component" {
    import { InjectType, ModuleDependencies } from "decorators/util";
    export function Component(componentOptions: {
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
}
declare module "decorators/config" {
    import { InjectType } from "decorators/util";
    export function Config($inject: InjectType, config: Function & {
        $inject: string[];
    }): (target: {
        moduleName: string;
    }) => void;
}
declare module "decorators/directive" {
    import { InjectType, ModuleDependencies } from "decorators/util";
    export function Directive(directiveOptions: {
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
}
declare module "decorators/filter" {
    import { InjectType, ModuleDependencies } from "decorators/util";
    export function Filter(filter: string, params: {
        filter: ((...args: any[]) => Function) & {
            $inject: string[];
        };
        $inject: InjectType;
        moduleName?: string;
        moduleDependencies?: ModuleDependencies;
    }): (target: Function & {
        moduleName?: string;
        filter?: string;
        $inject?: string[];
    }) => void;
}
declare module "decorators/inject" {
    export function Inject(injected?: string): (targetClass: {
        constructor: Function & {
            injections?: {
                [injectedString: string]: string;
            };
            $inject: string[];
        };
    }, propertyName: string) => void;
}
declare module "decorators/mock" {
    import { ModuleDependencies } from "decorators/util";
    export function MockModule(...args: ModuleDependencies): any;
}
declare module "decorators/run" {
    import { InjectType } from "decorators/util";
    export function Run($inject: InjectType, run: Function): (target: {
        moduleName: string;
    }) => void;
}
declare module "decorators/service" {
    import { InjectType, ModuleDependencies } from "decorators/util";
    export function Service(service: string, params?: {
        $inject?: InjectType;
        moduleName?: string;
        moduleDependencies?: ModuleDependencies;
    }): (target: Function & {
        moduleName?: string;
        service?: string;
        $inject?: (string | {})[];
        injections?: {
            [injected: string]: string;
        };
    }) => void;
}
declare module "decorators" {
    export * from "decorators/property";
    export * from "decorators/binding";
    export * from "decorators/component";
    export * from "decorators/config";
    export * from "decorators/directive";
    export * from "decorators/filter";
    export * from "decorators/inject";
    export * from "decorators/mock";
    export * from "decorators/module";
    export * from "decorators/run";
    export * from "decorators/service";
}
