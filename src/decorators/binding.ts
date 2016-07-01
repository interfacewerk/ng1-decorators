function defaultAddBinding(prefix, binding: string, target, name: string) {
	var binding = makeBindingString(prefix, binding);;
	target.constructor.componentOptions = target.constructor.componentOptions || {};
	target.constructor.componentOptions.bindings = target.constructor.componentOptions.bindings || {};
	target.constructor.componentOptions.bindings[name] = binding;		
}

function makeBindingString(prefix: string, binding?: string) {
	binding = binding || prefix;
	if (binding[0] !== prefix) binding = `${prefix}${binding}`;
	return binding;
}

export type EventEmitter<T> = (params: T) => any;
export function EventBinding(binding?: string) {
	return function(target, name: string) {
		return defaultAddBinding('&', binding, target, name);
	}
}

export var Output = EventBinding;

export function InputString(binding?: string) {
	return function(target, name: string) {
		return defaultAddBinding('@', binding, target, name);
	}
}

export function Input(binding?: string) {
	return function(target, name: string) {
		defaultAddBinding('<', binding, target, name);
	}
}
