import {InjectType, makeInject} from './util';

export function Run(
	$inject: InjectType,
	run: Function
) {
	run.$inject = makeInject($inject);
	return function(target) {
		angular.module(target.moduleName).run(run);	
	};
}