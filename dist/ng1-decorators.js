/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var component_1 = __webpack_require__(1);
	exports.Component = component_1.Component;
	var binding_1 = __webpack_require__(4);
	exports.Input = binding_1.Input;
	exports.InputString = binding_1.InputString;
	exports.Output = binding_1.Output;
	exports.EventBinding = binding_1.EventBinding;
	var config_1 = __webpack_require__(5);
	exports.Config = config_1.Config;
	var directive_1 = __webpack_require__(6);
	exports.Directive = directive_1.Directive;
	var filter_1 = __webpack_require__(7);
	exports.Filter = filter_1.Filter;
	var inject_1 = __webpack_require__(8);
	exports.Inject = inject_1.Inject;
	var mock_1 = __webpack_require__(9);
	exports.MockModule = mock_1.MockModule;
	var module_1 = __webpack_require__(3);
	exports.Module = module_1.Module;
	exports.AngularModule = module_1.AngularModule;
	var run_1 = __webpack_require__(10);
	exports.Run = run_1.Run;
	var service_1 = __webpack_require__(11);
	exports.Service = service_1.Service;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	var module_1 = __webpack_require__(3);
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
	function Component(componentOptions, params) {
	    var componentSelector = util_1.directiveNormalize(componentOptions.selector);
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
	            // here we initialize the instance
	            var instance = Object.create(target.prototype);
	            // on which we pre-fill with angular injections
	            componentOptions.controller.$inject.forEach(function (injected, idx) {
	                instance[target.injections ? target.injections[injected] : injected] = args[idx];
	            });
	            // then we call the constructor of the class
	            target.apply(instance, args);
	            return instance;
	        };
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, componentOptions.directives);
	        componentOptions.controller.$inject = util_1.makeInject(target.$inject || []).concat(util_1.makeInject(params.$inject || []));
	        var mod = module_1.makeAngularModuleIfNecessary(componentSelector, target, params);
	        // console.log(`@Component ${componentSelector} with $inject ${componentOptions.controller.$inject}`);
	        mod.component(componentSelector, componentOptions);
	    };
	}
	exports.Component = Component;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	function transformModuleDependenciesIntoArrayOfString(deps) {
	    return deps.map(function (m) { return m.moduleName
	        ? m.moduleName
	        : m; });
	}
	exports.transformModuleDependenciesIntoArrayOfString = transformModuleDependenciesIntoArrayOfString;
	function makeInject($inject) {
	    return $inject.map(function ($i) { return $i.service
	        ? $i.service
	        : $i; });
	}
	exports.makeInject = makeInject;
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
	exports.addMissingDependenciesFrom$Inject = addMissingDependenciesFrom$Inject;
	var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
	/**
	 * Converts all accepted directives format into proper directive name.
	 * @param name Name to normalize
	 */
	function directiveNormalize(name) {
	    return camelCase(name.replace(PREFIX_REGEXP, ''));
	}
	exports.directiveNormalize = directiveNormalize;
	var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
	var MOZ_HACK_REGEXP = /^moz([A-Z])/;
	function camelCase(name) {
	    return name.
	        replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
	        return offset ? letter.toUpperCase() : letter;
	    }).
	        replace(MOZ_HACK_REGEXP, 'Moz$1');
	}
	exports.camelCase = camelCase;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	function AngularModule(moduleName, moduleDependencies) {
	    if (moduleDependencies) {
	        var deps = util_1.transformModuleDependenciesIntoArrayOfString(moduleDependencies) || [];
	        // console.log(`Registering module ${moduleName} with ${deps}`);		
	        return angular.module(moduleName, deps);
	    }
	    else {
	        return angular.module(moduleName);
	    }
	}
	exports.AngularModule = AngularModule;
	function Module(moduleName, moduleDependencies) {
	    return function (target) {
	        target.moduleName = moduleName;
	        AngularModule(moduleName, moduleDependencies);
	    };
	}
	exports.Module = Module;
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
	exports.makeAngularModuleIfNecessary = makeAngularModuleIfNecessary;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
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
	exports.EventBinding = EventBinding;
	exports.Output = EventBinding;
	function InputString(binding) {
	    return function (target, name) {
	        return defaultAddBinding('@', binding, target, name);
	    };
	}
	exports.InputString = InputString;
	function Input(binding) {
	    return function (target, name) {
	        defaultAddBinding('<', binding, target, name);
	    };
	}
	exports.Input = Input;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	function Config($inject, config) {
	    config.$inject = util_1.makeInject($inject);
	    return function (target) {
	        angular.module(target.moduleName).config(config);
	    };
	}
	exports.Config = Config;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	var module_1 = __webpack_require__(3);
	function Directive(directiveOptions, params) {
	    var componentSelector = util_1.directiveNormalize(directiveOptions.selector);
	    params = params || {};
	    return function (target) {
	        directiveOptions.controller = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            // here we initialize the instance
	            var instance = Object.create(target.prototype);
	            // on which we pre-fill with angular injections
	            directiveOptions.controller.$inject.forEach(function (injected, idx) {
	                instance[target.injections ? target.injections[injected] : injected] = args[idx];
	            });
	            // then we call the constructor of the class
	            target.apply(instance, args);
	            return instance;
	        };
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, directiveOptions.directives || []);
	        directiveOptions.controller.$inject = util_1.makeInject(target.$inject || []).concat(util_1.makeInject(params.$inject || []));
	        var mod = module_1.makeAngularModuleIfNecessary(componentSelector, target, params);
	        // console.log(`@Component ${componentSelector} with $inject ${directiveOptions.controller.$inject}`);
	        mod.directive(componentSelector, function () {
	            return directiveOptions;
	        });
	    };
	}
	exports.Directive = Directive;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	var module_1 = __webpack_require__(3);
	function Filter(filter, params) {
	    return function (target) {
	        target.filter = filter;
	        target.$inject = target.$inject || [];
	        target.$inject = target.$inject.concat(util_1.makeInject(params.$inject));
	        params.filter.$inject = target.$inject;
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
	        var mod = module_1.makeAngularModuleIfNecessary(filter, target, params);
	        mod.filter(target.filter, params.filter);
	    };
	}
	exports.Filter = Filter;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	function Inject(injected) {
	    return function (targetClass, propertyName) {
	        injected = injected || propertyName;
	        targetClass.constructor.injections = targetClass.constructor.injections || {};
	        targetClass.constructor.injections[util_1.makeInject([injected])[0]] = propertyName;
	        targetClass.constructor.$inject = targetClass.constructor.$inject || [];
	        targetClass.constructor.$inject.push(injected);
	    };
	}
	exports.Inject = Inject;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	function MockModule() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    return angular.mock.module.apply(angular.mock, util_1.transformModuleDependenciesIntoArrayOfString(args));
	}
	exports.MockModule = MockModule;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	function Run($inject, run) {
	    run.$inject = util_1.makeInject($inject);
	    return function (target) {
	        angular.module(target.moduleName).run(run);
	    };
	}
	exports.Run = Run;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(2);
	var module_1 = __webpack_require__(3);
	function Service(service, params) {
	    if (params === void 0) { params = {}; }
	    return function (target) {
	        var serviceFunction = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            // console.log("INSTANTIATION", service, args);
	            serviceFunction.$inject.forEach(function (injected, idx) {
	                target.prototype[target.injections ? target.injections[injected] : injected] = args[idx];
	            });
	            args.unshift(null);
	            return new (Function.prototype.bind.apply(target, args))();
	        };
	        target.service = service;
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
	        params.moduleDependencies = util_1.addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);
	        serviceFunction.$inject = util_1.makeInject(target.$inject || []).concat(util_1.makeInject(params.$inject || []));
	        // so that $injector.instantiate works
	        target.$inject = serviceFunction.$inject;
	        var mod = module_1.makeAngularModuleIfNecessary(service, target, params);
	        // console.log(`@Service ${target.service}`);
	        mod.service(target.service, serviceFunction);
	    };
	}
	exports.Service = Service;


/***/ }
/******/ ]);
//# sourceMappingURL=ng1-decorators.js.map