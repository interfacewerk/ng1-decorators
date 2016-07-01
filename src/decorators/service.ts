import {InjectType, ModuleDependencies, directiveNormalize, addMissingDependenciesFrom$Inject, makeInject} from './util';
import {makeAngularModuleIfNecessary} from './module';

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
			serviceFunction.$inject.forEach((injected, idx: number) => {
        		target.prototype[target.injections ? target.injections[injected] : injected] = args[idx];
      		});
			args.unshift(null);
        	return new (Function.prototype.bind.apply(target, args))();
		}
		target.service = service;
		serviceFunction.$inject = target.$inject || [];
		serviceFunction.$inject = serviceFunction.$inject.concat(params.$inject || []);

		params.moduleDependencies = addMissingDependenciesFrom$Inject(params.moduleDependencies, serviceFunction.$inject);

		serviceFunction.$inject = makeInject(serviceFunction.$inject);

		// so that $injector.instantiate works
		target.$inject = serviceFunction.$inject;

		var mod = makeAngularModuleIfNecessary(service, target, params);
		// console.log(`@Service ${target.service}`);
		mod.service(target.service, serviceFunction);
	}
}
