export function Property(target: Object, name: string) {
	Object.defineProperty(target, name, {
		get: function() {
			return this['_' + name];
		},
		set: function(value) {
			this['_' + name] = value;
		},
		enumerable: true,
		configurable: true
	});
}