declare module "decorators" {
    export module ng1decorators {
    }
}
declare module ng1decorators {
    type EventEmitter<T> = (params: T) => any;
    function EventBinding(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
    var Output: typeof EventBinding;
    function InputString(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
    function Input(binding?: string): (target: Function & {
        constructor: Function & {
            componentOptions?: {
                bindings?: {
                    [binding: string]: string;
                };
            };
        };
    }, name: string) => void;
}
declare module ng1decorators {
    type ModuleType2 = {
        moduleName?: string;
    };
    type ServiceType2 = {
        service?: string;
    };
    type InjectType = Array<string | {}>;
    type ModuleDependencies = Array<ModuleDependency>;
    type ModuleDependency = string | ModuleType2;
    function transformModuleDependenciesIntoArrayOfString(deps: ModuleDependencies): string[];
    function makeInject($inject: InjectType): string[];
    function addMissingDependenciesFrom$Inject(moduleDependencies: ModuleDependencies, optionalInjects: InjectType): (string | {
        moduleName?: string;
    })[];
    function directiveNormalize(name: string): string;
    function camelCase(name: string): string;
}
declare module ng1decorators {
    function AngularModule(moduleName: string, moduleDependencies?: ModuleDependencies): ng.IModule;
    function Module(moduleName: string, moduleDependencies?: ModuleDependencies): (target: Function & {
        moduleName?: string;
    }) => void;
    function makeAngularModuleIfNecessary(moduleNameIfNotProvided: string, target: Function & {
        moduleName?: string;
    }, params: {
        moduleName?: string;
        moduleDependencies?: ModuleDependencies;
    }): ng.IModule;
}
declare module ng1decorators {
    function Component(componentOptions: {
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
declare module ng1decorators {
    function Config($inject: InjectType, config: Function & {
        $inject: string[];
    }): (target: {
        moduleName: string;
    }) => void;
}
declare module ng1decorators {
    function Directive(directiveOptions: {
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
declare module ng1decorators {
    function Filter(filter: string, params: {
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
declare module ng1decorators {
    function Inject(injected?: string): (targetClass: {
        constructor: Function & {
            injections?: {
                [injectedString: string]: string;
            };
            $inject: string[];
        };
    }, propertyName: string) => void;
}
declare module ng1decorators {
    function MockModule(...args: ModuleDependencies): any;
}
declare module ng1decorators {
    function Property(target: Object, name: string): void;
}
declare module ng1decorators {
    function Run($inject: InjectType, run: Function): (target: {
        moduleName: string;
    }) => void;
}
declare module ng1decorators {
    function Service(service: string, params?: {
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
