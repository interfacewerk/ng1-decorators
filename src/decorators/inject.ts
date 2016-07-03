import {makeInject} from './util';

export function Inject(injected?: string) {
	return function (
		targetClass: {
			constructor: Function & {
				injections?: {[injectedString: string] : string},
				$inject: string[]
			}, 
		}, 
		propertyName: string
	) {
		injected = injected || propertyName;

		targetClass.constructor.injections = targetClass.constructor.injections || {};
		targetClass.constructor.injections[makeInject([injected])[0]] = propertyName;
		
		targetClass.constructor.$inject = targetClass.constructor.$inject || [];
		targetClass.constructor.$inject.push(injected);
	}
}