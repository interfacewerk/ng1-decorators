/// <reference path="./util.ts" />

module ng1decorators {

	export function Run(
		$inject: InjectType,
		run: Function
	) {
		run.$inject = makeInject($inject);
		return function(target: {moduleName: string}) {
			angular.module(target.moduleName).run(run);	
		};
	}
}