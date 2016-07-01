import {InjectType, ModuleDependencies, directiveNormalize, addMissingDependenciesFrom$Inject, makeInject} from './util';
import {makeAngularModuleIfNecessary} from './module';

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
export function Component(
	componentOptions: {
		selector: string,
		directives?: InjectType,
		templateUrl?: string | Function,
		template?: string | Function,
        transclude?: boolean | string | {[slot: string]: string},
        require?: string | string[] | {[controller: string]: string},
		bindings?: {[binding: string]: string}
	}, 
	params?: {
		$inject?: InjectType,
		moduleName?: string,
		moduleDependencies?: ModuleDependencies,
	}
) {
	var componentSelector = directiveNormalize(componentOptions.selector);	
	params = params || {};
	
	return function (target: Function & {
		componentOptions?: {
			bindings?: {[binding: string]: string}
		},
		moduleName?: string,
		$inject?: string[],
		injections?: {[injected: string]: string}
	}) {
		componentOptions.bindings = componentOptions.bindings || {};
		if (target.componentOptions && target.componentOptions.bindings) {
			for(var binding in target.componentOptions.bindings) {
				if (componentOptions.bindings[binding]) {
					throw `Binding ${binding} already defined for ${componentOptions.selector}`;
				}
				componentOptions.bindings[binding] = target.componentOptions.bindings[binding];
			}	
		}
		componentOptions['controller'] = function (...args: any[]) {
			// here we initialize the instance
			var instance = Object.create(target.prototype);
			// on which we pre-fill with angular injections
			componentOptions['controller'].$inject.forEach((injected, idx: number) => {
        		instance[target.injections ? target.injections[injected] : injected] = args[idx];
      		});
			// then we call the constructor of the class
			target.apply(instance, args);
			return instance;
		}
		componentOptions['controller'].$inject = target.$inject || [];
		componentOptions['controller'].$inject = componentOptions['controller'].$inject.concat(params.$inject || []);
		
		params.moduleDependencies = addMissingDependenciesFrom$Inject(
			params.moduleDependencies, 
			componentOptions['controller'].$inject
		);
		
		params.moduleDependencies = addMissingDependenciesFrom$Inject(
			params.moduleDependencies, 
			componentOptions.directives || []
		);
		
		componentOptions['controller'].$inject = makeInject(componentOptions['controller'].$inject);
		
		var mod = makeAngularModuleIfNecessary(componentSelector, target, params);
		// console.log(`@Component ${componentSelector} with $inject ${componentOptions['controller'].$inject}`);
		mod.component(componentSelector, componentOptions);	
	};
}