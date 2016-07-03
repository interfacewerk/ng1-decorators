/// <reference path="./util.ts" />

module ng1decorators {

	export function MockModule(...args: ModuleDependencies) {
		return angular.mock.module.apply(angular.mock, 
			transformModuleDependenciesIntoArrayOfString(args)
		);
	}
}