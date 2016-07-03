/// <reference path="./util.ts" />
/// <reference path="./module.ts" />

module ng1decorators {

	export function Filter(
		filter: string, 
		params: {
			filter: ((...args: any[]) => Function) & {$inject: string[]},
			$inject: InjectType,
			moduleName?: string,
			moduleDependencies?: ModuleDependencies 
		}
	) {
		return function (target: Function & {
			moduleName?: string,
			filter?: string,
			$inject?: string[]
		}) {
			target.filter = filter;
			target.$inject = target.$inject || [];
			target.$inject = target.$inject.concat(makeInject(params.$inject));
			params.filter.$inject = target.$inject;

			params.moduleDependencies = addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);

			var mod = makeAngularModuleIfNecessary(filter, target, params);
			mod.filter(target.filter, params.filter);
		}
	}
}