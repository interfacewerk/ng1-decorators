/// <reference path="./util.ts" />
/// <reference path="./module.ts" />

module ng1decorators {

	export function Service(
		service: string,
		params: {
			$inject?: InjectType,
			moduleName?: string,
			moduleDependencies?: ModuleDependencies
		} = {}
	) {
		return function (target: Function & {
			moduleName?: string,
			service?: string,
			$inject?: InjectType,
			injections?: {[injected: string]: string}
		}) {
			var serviceFunction = function (...args: any[]) {
				// console.log("INSTANTIATION", service, args);
				serviceFunction.$inject.forEach((injected: string, idx: number) => {
					target.prototype[target.injections ? target.injections[injected] : injected] = args[idx];
				});
				args.unshift(null);
				return new (Function.prototype.bind.apply(target, args))();
			}
			target.service = service;

			params.moduleDependencies = addMissingDependenciesFrom$Inject(params.moduleDependencies, target.$inject);
			params.moduleDependencies = addMissingDependenciesFrom$Inject(params.moduleDependencies, params.$inject);

			serviceFunction.$inject = makeInject(target.$inject || []).concat(makeInject(params.$inject || []));

			// so that $injector.instantiate works
			target.$inject = serviceFunction.$inject;

			var mod = makeAngularModuleIfNecessary(service, target, params);
			// console.log(`@Service ${target.service}`);
			mod.service(target.service, serviceFunction);
		}
	}
}