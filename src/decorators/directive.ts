/// <reference path="./util.ts" />
/// <reference path="./module.ts" />

module ng1decorators {

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
		link?: ng.IDirectiveLinkFn | ng.IDirectivePrePost,
		controller: Function
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
			directiveOptions.controller = function (...args: any[]) {
				// here we initialize the instance
				var instance = Object.create(target.prototype);
				// on which we pre-fill with angular injections
				directiveOptions.controller.$inject.forEach((injected: string, idx: number) => {
					instance[target.injections ? target.injections[injected] : injected] = args[idx];
				});
				// then we call the constructor of the class
				target.apply(instance, args);
				return instance;
			}

			params.moduleDependencies = addMissingDependenciesFrom$Inject(
				params.moduleDependencies, 
				target.$inject
			);

			params.moduleDependencies = addMissingDependenciesFrom$Inject(
				params.moduleDependencies, 
				params.$inject
			);
			
			params.moduleDependencies = addMissingDependenciesFrom$Inject(
				params.moduleDependencies, 
				directiveOptions.directives || []
			);
			
			directiveOptions.controller.$inject = makeInject(target.$inject || []).concat(makeInject(params.$inject || []));
			
			var mod = makeAngularModuleIfNecessary(componentSelector, target, params);
			// console.log(`@Component ${componentSelector} with $inject ${directiveOptions.controller.$inject}`);
			mod.directive(componentSelector, () => {
				return directiveOptions
			});	
		};
	}
}