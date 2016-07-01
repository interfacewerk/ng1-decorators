import {InjectType, makeInject} from './util';

export function Config(
	$inject: InjectType,
	config: Function
) {
	config.$inject = makeInject($inject);
	return function(target) {
		angular.module(target.moduleName).config(config);	
	};
}