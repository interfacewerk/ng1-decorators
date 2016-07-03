System.register("decorators", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
var ng1decorators;
(function (ng1decorators) {
    function defaultAddBinding(prefix, binding, target, name) {
        var binding = makeBindingString(prefix, binding);
        target.constructor.componentOptions = target.constructor.componentOptions || {};
        target.constructor.componentOptions.bindings = target.constructor.componentOptions.bindings || {};
        target.constructor.componentOptions.bindings[name] = binding;
    }
    function makeBindingString(prefix, binding) {
        binding = binding || prefix;
        if (binding[0] !== prefix)
            binding = "" + prefix + binding;
        return binding;
    }
    function EventBinding(binding) {
        return function (target, name) {
            return defaultAddBinding('&', binding, target, name);
        };
    }
    ng1decorators.EventBinding = EventBinding;
    ng1decorators.Output = EventBinding;
    function InputString(binding) {
        return function (target, name) {
            return defaultAddBinding('@', binding, target, name);
        };
    }
    ng1decorators.InputString = InputString;
    function Input(binding) {
        return function (target, name) {
            defaultAddBinding('<', binding, target, name);
        };
    }
    ng1decorators.Input = Input;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function transformModuleDependenciesIntoArrayOfString(deps) {
        return deps.map(function (m) { return m.moduleName
            ? m.moduleName
            : m; });
    }
    ng1decorators.transformModuleDependenciesIntoArrayOfString = transformModuleDependenciesIntoArrayOfString;
    function makeInject($inject) {
        return $inject.map(function ($i) { return $i.service
            ? $i.service
            : $i; });
    }
    ng1decorators.makeInject = makeInject;
    function addMissingDependenciesFrom$Inject(moduleDependencies, optionalInjects) {
        var deps = (moduleDependencies || []).slice(0);
        (optionalInjects || []).forEach(function (inj) {
            var mod = inj.moduleName;
            if (!mod || deps.indexOf(mod) !== -1)
                return;
            deps.push(inj);
        });
        if (deps.length === 0 && !moduleDependencies) {
            return moduleDependencies;
        }
        return deps;
    }
    ng1decorators.addMissingDependenciesFrom$Inject = addMissingDependenciesFrom$Inject;
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    ng1decorators.directiveNormalize = directiveNormalize;
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    function camelCase(name) {
        return name.
            replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).
            replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    ng1decorators.camelCase = camelCase;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function AngularModule(moduleName, moduleDependencies) {
        if (moduleDependencies) {
            var deps = ng1decorators.transformModuleDependenciesIntoArrayOfString(moduleDependencies) || [];
            return angular.module(moduleName, deps);
        }
        else {
            return angular.module(moduleName);
        }
    }
    ng1decorators.AngularModule = AngularModule;
    function Module(moduleName, moduleDependencies) {
        return function (target) {
            target.moduleName = moduleName;
            AngularModule(moduleName, moduleDependencies);
        };
    }
    ng1decorators.Module = Module;
    function makeAngularModuleIfNecessary(moduleNameIfNotProvided, target, params) {
        if (params.moduleName) {
            target.moduleName = params.moduleName;
            return AngularModule(target.moduleName, params.moduleDependencies);
        }
        if (target.moduleName) {
            return AngularModule(target.moduleName, params.moduleDependencies);
        }
        else {
            target.moduleName = moduleNameIfNotProvided;
            return AngularModule(target.moduleName, params.moduleDependencies || []);
        }
    }
    ng1decorators.makeAngularModuleIfNecessary = makeAngularModuleIfNecessary;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Component(componentOptions, params) {
        var componentSelector = ng1decorators.directiveNormalize(componentOptions.selector);
        params = params || {};
        return function (target) {
            componentOptions.bindings = componentOptions.bindings || {};
            if (target.componentOptions && target.componentOptions.bindings) {
                for (var binding in target.componentOptions.bindings) {
                    if (componentOptions.bindings[binding]) {
                        throw "Binding " + binding + " already defined for " + componentOptions.selector;
                    }
                    componentOptions.bindings[binding] = target.componentOptions.bindings[binding];
                }
            }
            componentOptions.controller = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var instance = Object.create(target.prototype);
                componentOptions.controller.$inject.forEach(function (injected, idx) {
                    instance[target.injections ? target.injections[injected] : injected] = args[idx];
                });
                target.apply(instance, args);
                return instance;
            };
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, componentOptions.directives);
            componentOptions.controller.$inject = ng1decorators.makeInject(target.$inject || []).concat(ng1decorators.makeInject(params.$inject || []));
            var mod = ng1decorators.makeAngularModuleIfNecessary(componentSelector, target, params);
            mod.component(componentSelector, componentOptions);
        };
    }
    ng1decorators.Component = Component;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Config($inject, config) {
        config.$inject = ng1decorators.makeInject($inject);
        return function (target) {
            angular.module(target.moduleName).config(config);
        };
    }
    ng1decorators.Config = Config;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Directive(directiveOptions, params) {
        var componentSelector = ng1decorators.directiveNormalize(directiveOptions.selector);
        params = params || {};
        return function (target) {
            directiveOptions.controller = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var instance = Object.create(target.prototype);
                directiveOptions.controller.$inject.forEach(function (injected, idx) {
                    instance[target.injections ? target.injections[injected] : injected] = args[idx];
                });
                target.apply(instance, args);
                return instance;
            };
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, directiveOptions.directives || []);
            directiveOptions.controller.$inject = ng1decorators.makeInject(target.$inject || []).concat(ng1decorators.makeInject(params.$inject || []));
            var mod = ng1decorators.makeAngularModuleIfNecessary(componentSelector, target, params);
            mod.directive(componentSelector, function () {
                return directiveOptions;
            });
        };
    }
    ng1decorators.Directive = Directive;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Filter(filter, params) {
        return function (target) {
            target.filter = filter;
            target.$inject = target.$inject || [];
            target.$inject = target.$inject.concat(ng1decorators.makeInject(params.$inject));
            params.filter.$inject = target.$inject;
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            var mod = ng1decorators.makeAngularModuleIfNecessary(filter, target, params);
            mod.filter(target.filter, params.filter);
        };
    }
    ng1decorators.Filter = Filter;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Inject(injected) {
        return function (targetClass, propertyName) {
            injected = injected || propertyName;
            targetClass.constructor.injections = targetClass.constructor.injections || {};
            targetClass.constructor.injections[ng1decorators.makeInject([injected])[0]] = propertyName;
            targetClass.constructor.$inject = targetClass.constructor.$inject || [];
            targetClass.constructor.$inject.push(injected);
        };
    }
    ng1decorators.Inject = Inject;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function MockModule() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return angular.mock.module.apply(angular.mock, ng1decorators.transformModuleDependenciesIntoArrayOfString(args));
    }
    ng1decorators.MockModule = MockModule;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Property(target, name) {
        Object.defineProperty(target, name, {
            get: function () {
                return this['_' + name];
            },
            set: function (value) {
                this['_' + name] = value;
            },
            enumerable: true,
            configurable: true
        });
    }
    ng1decorators.Property = Property;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Run($inject, run) {
        run.$inject = ng1decorators.makeInject($inject);
        return function (target) {
            angular.module(target.moduleName).run(run);
        };
    }
    ng1decorators.Run = Run;
})(ng1decorators || (ng1decorators = {}));
var ng1decorators;
(function (ng1decorators) {
    function Service(service, params) {
        if (params === void 0) { params = {}; }
        return function (target) {
            var serviceFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                serviceFunction.$inject.forEach(function (injected, idx) {
                    target.prototype[target.injections ? target.injections[injected] : injected] = args[idx];
                });
                args.unshift(null);
                return new (Function.prototype.bind.apply(target, args))();
            };
            target.service = service;
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = ng1decorators.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            serviceFunction.$inject = ng1decorators.makeInject(target.$inject || []).concat(ng1decorators.makeInject(params.$inject || []));
            target.$inject = serviceFunction.$inject;
            var mod = ng1decorators.makeAngularModuleIfNecessary(service, target, params);
            mod.service(target.service, serviceFunction);
        };
    }
    ng1decorators.Service = Service;
})(ng1decorators || (ng1decorators = {}));
