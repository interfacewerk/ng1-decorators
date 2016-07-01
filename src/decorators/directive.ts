import {InjectType, ModuleDependencies, directiveNormalize, addMissingDependenciesFrom$Inject, makeInject} from './util';
import {makeAngularModuleIfNecessary} from './module';

export function Directive(directiveOptions: {
    selector: string,
    directives?: InjectType,
    scope?: boolean | Object,
    template?: string | Function,
    templateNamespace?: string,
    templateUrl?: string | Function,
    transclude?: boolean | string | {[slot: string]: string},
    require?: string | string[] | {[controller: string]: string},
    bindToController?: boolean | Object,
    restrict?: string,
    controllerAs?: string,
	compile?: ng.IDirectiveCompileFn
	link?: ng.IDirectiveLinkFn | ng.IDirectivePrePost
}, 
	params?: {
		$inject?: InjectType,
		moduleName?: string,
		moduleDependencies?: ModuleDependencies,
	}
) {
	var componentSelector = directiveNormalize(directiveOptions.selector);
	params = params || {};
	
	return function (target: Function & {
		directiveOptions?: {
			bindings?: {[binding: string]: string}
		},
		moduleName?: string,
		$inject?: string[],
		injections?: {[injected: string]: string}
	}) {
		directiveOptions['controller'] = function (...args: any[]) {
			// here we initialize the instance
			var instance = Object.create(target.prototype);
			// on which we pre-fill with angular injections
			directiveOptions['controller'].$inject.forEach((injected, idx: number) => {
        		instance[target.injections ? target.injections[injected] : injected] = args[idx];
      		});
			// then we call the constructor of the class
			target.apply(instance, args);
			return instance;
		}
		directiveOptions['controller'].$inject = target.$inject || [];
		directiveOptions['controller'].$inject = directiveOptions['controller'].$inject.concat(params.$inject || []);
		
		params.moduleDependencies = addMissingDependenciesFrom$Inject(
			params.moduleDependencies, 
			directiveOptions['controller'].$inject
		);
		
		params.moduleDependencies = addMissingDependenciesFrom$Inject(
			params.moduleDependencies, 
			directiveOptions.directives || []
		);
		
		directiveOptions['controller'].$inject = makeInject(directiveOptions['controller'].$inject);
		
		var mod = makeAngularModuleIfNecessary(componentSelector, target, params);
		// console.log(`@Component ${componentSelector} with $inject ${directiveOptions['controller'].$inject}`);
		mod.directive(componentSelector, () => {
            return directiveOptions
        });	
	};
}