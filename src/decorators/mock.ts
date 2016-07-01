import {ModuleDependencies, transformModuleDependenciesIntoArrayOfString} from './util';

export function MockModule(...args: ModuleDependencies) {
	return angular.mock.module.apply(angular.mock, 
		transformModuleDependenciesIntoArrayOfString(args)
	);
}