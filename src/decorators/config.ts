import {InjectType, makeInject} from './util';

export function Config(
	$inject: InjectType,
	config: Function & { $inject: string[]}
) {
	config.$inject = makeInject($inject);
	return function(target: {moduleName: string}) {
		angular.module(target.moduleName).config(config);	
	};
}