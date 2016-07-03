System.register("decorators/property", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("Property", Property);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("decorators/binding", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Output;
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
    exports_2("EventBinding", EventBinding);
    function InputString(binding) {
        return function (target, name) {
            return defaultAddBinding('@', binding, target, name);
        };
    }
    exports_2("InputString", InputString);
    function Input(binding) {
        return function (target, name) {
            defaultAddBinding('<', binding, target, name);
        };
    }
    exports_2("Input", Input);
    return {
        setters:[],
        execute: function() {
            exports_2("Output", Output = EventBinding);
        }
    }
});
System.register("decorators/util", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var PREFIX_REGEXP, SPECIAL_CHARS_REGEXP, MOZ_HACK_REGEXP;
    function transformModuleDependenciesIntoArrayOfString(deps) {
        return deps.map(function (m) { return m.moduleName
            ? m.moduleName
            : m; });
    }
    exports_3("transformModuleDependenciesIntoArrayOfString", transformModuleDependenciesIntoArrayOfString);
    function makeInject($inject) {
        return $inject.map(function ($i) { return $i.service
            ? $i.service
            : $i; });
    }
    exports_3("makeInject", makeInject);
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
    exports_3("addMissingDependenciesFrom$Inject", addMissingDependenciesFrom$Inject);
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    exports_3("directiveNormalize", directiveNormalize);
    function camelCase(name) {
        return name.
            replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).
            replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    exports_3("camelCase", camelCase);
    return {
        setters:[],
        execute: function() {
            PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
            SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
            MOZ_HACK_REGEXP = /^moz([A-Z])/;
        }
    }
});
System.register("decorators/module", ["decorators/util"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var util_1;
    function AngularModule(moduleName, moduleDependencies) {
        if (moduleDependencies) {
            var deps = util_1.transformModuleDependenciesIntoArrayOfString(moduleDependencies) || [];
            return angular.module(moduleName, deps);
        }
        else {
            return angular.module(moduleName);
        }
    }
    exports_4("AngularModule", AngularModule);
    function Module(moduleName, moduleDependencies) {
        return function (target) {
            target.moduleName = moduleName;
            AngularModule(moduleName, moduleDependencies);
        };
    }
    exports_4("Module", Module);
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
    exports_4("makeAngularModuleIfNecessary", makeAngularModuleIfNecessary);
    return {
        setters:[
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/component", ["decorators/util", "decorators/module"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var util_2, module_1;
    function Component(componentOptions, params) {
        var componentSelector = util_2.directiveNormalize(componentOptions.selector);
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
            params.moduleDependencies = util_2.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = util_2.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            params.moduleDependencies = util_2.addMissingDependenciesFrom$Inject(params.moduleDependencies, componentOptions.directives);
            componentOptions.controller.$inject = util_2.makeInject(target.$inject || []).concat(util_2.makeInject(params.$inject || []));
            var mod = module_1.makeAngularModuleIfNecessary(componentSelector, target, params);
            mod.component(componentSelector, componentOptions);
        };
    }
    exports_5("Component", Component);
    return {
        setters:[
            function (util_2_1) {
                util_2 = util_2_1;
            },
            function (module_1_1) {
                module_1 = module_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/config", ["decorators/util"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var util_3;
    function Config($inject, config) {
        config.$inject = util_3.makeInject($inject);
        return function (target) {
            angular.module(target.moduleName).config(config);
        };
    }
    exports_6("Config", Config);
    return {
        setters:[
            function (util_3_1) {
                util_3 = util_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/directive", ["decorators/util", "decorators/module"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var util_4, module_2;
    function Directive(directiveOptions, params) {
        var componentSelector = util_4.directiveNormalize(directiveOptions.selector);
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
            params.moduleDependencies = util_4.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = util_4.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            params.moduleDependencies = util_4.addMissingDependenciesFrom$Inject(params.moduleDependencies, directiveOptions.directives || []);
            directiveOptions.controller.$inject = util_4.makeInject(target.$inject || []).concat(util_4.makeInject(params.$inject || []));
            var mod = module_2.makeAngularModuleIfNecessary(componentSelector, target, params);
            mod.directive(componentSelector, function () {
                return directiveOptions;
            });
        };
    }
    exports_7("Directive", Directive);
    return {
        setters:[
            function (util_4_1) {
                util_4 = util_4_1;
            },
            function (module_2_1) {
                module_2 = module_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/filter", ["decorators/util", "decorators/module"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var util_5, module_3;
    function Filter(filter, params) {
        return function (target) {
            target.filter = filter;
            target.$inject = target.$inject || [];
            target.$inject = target.$inject.concat(util_5.makeInject(params.$inject));
            params.filter.$inject = target.$inject;
            params.moduleDependencies = util_5.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            var mod = module_3.makeAngularModuleIfNecessary(filter, target, params);
            mod.filter(target.filter, params.filter);
        };
    }
    exports_8("Filter", Filter);
    return {
        setters:[
            function (util_5_1) {
                util_5 = util_5_1;
            },
            function (module_3_1) {
                module_3 = module_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/inject", ["decorators/util"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var util_6;
    function Inject(injected) {
        return function (targetClass, propertyName) {
            injected = injected || propertyName;
            targetClass.constructor.injections = targetClass.constructor.injections || {};
            targetClass.constructor.injections[util_6.makeInject([injected])[0]] = propertyName;
            targetClass.constructor.$inject = targetClass.constructor.$inject || [];
            targetClass.constructor.$inject.push(injected);
        };
    }
    exports_9("Inject", Inject);
    return {
        setters:[
            function (util_6_1) {
                util_6 = util_6_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/mock", ["decorators/util"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var util_7;
    function MockModule() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return angular.mock.module.apply(angular.mock, util_7.transformModuleDependenciesIntoArrayOfString(args));
    }
    exports_10("MockModule", MockModule);
    return {
        setters:[
            function (util_7_1) {
                util_7 = util_7_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/run", ["decorators/util"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var util_8;
    function Run($inject, run) {
        run.$inject = util_8.makeInject($inject);
        return function (target) {
            angular.module(target.moduleName).run(run);
        };
    }
    exports_11("Run", Run);
    return {
        setters:[
            function (util_8_1) {
                util_8 = util_8_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators/service", ["decorators/util", "decorators/module"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var util_9, module_4;
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
            params.moduleDependencies = util_9.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
            params.moduleDependencies = util_9.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
            serviceFunction.$inject = util_9.makeInject(target.$inject || []).concat(util_9.makeInject(params.$inject || []));
            target.$inject = serviceFunction.$inject;
            var mod = module_4.makeAngularModuleIfNecessary(service, target, params);
            mod.service(target.service, serviceFunction);
        };
    }
    exports_12("Service", Service);
    return {
        setters:[
            function (util_9_1) {
                util_9 = util_9_1;
            },
            function (module_4_1) {
                module_4 = module_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("decorators", ["decorators/property", "decorators/binding", "decorators/component", "decorators/config", "decorators/directive", "decorators/filter", "decorators/inject", "decorators/mock", "decorators/module", "decorators/run", "decorators/service"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters:[
            function (property_1_1) {
                exportStar_1(property_1_1);
            },
            function (binding_1_1) {
                exportStar_1(binding_1_1);
            },
            function (component_1_1) {
                exportStar_1(component_1_1);
            },
            function (config_1_1) {
                exportStar_1(config_1_1);
            },
            function (directive_1_1) {
                exportStar_1(directive_1_1);
            },
            function (filter_1_1) {
                exportStar_1(filter_1_1);
            },
            function (inject_1_1) {
                exportStar_1(inject_1_1);
            },
            function (mock_1_1) {
                exportStar_1(mock_1_1);
            },
            function (module_5_1) {
                exportStar_1(module_5_1);
            },
            function (run_1_1) {
                exportStar_1(run_1_1);
            },
            function (service_1_1) {
                exportStar_1(service_1_1);
            }],
        execute: function() {
        }
    }
});
