export type ModuleType2 = {
	moduleName?: string
}

export type ServiceType2 = {
	service?: string
}

export type InjectType = Array<string | {}>

export type ModuleDependencies = Array<ModuleDependency>

export type ModuleDependency = string | ModuleType2

export function transformModuleDependenciesIntoArrayOfString(deps: ModuleDependencies): string[] {
	return deps.map(
		m => (<ModuleType2>m).moduleName 
		? (<ModuleType2>m).moduleName 
		: <string>m); 
}

export function makeInject($inject: InjectType) {
	return $inject.map(
		$i => (<ServiceType2>$i).service
			? (<ServiceType2>$i).service
			: <string>$i
	);
}

export function addMissingDependenciesFrom$Inject(moduleDependencies: ModuleDependencies, optionalInjects: InjectType) {
	var deps = (moduleDependencies || []).slice(0);
	(optionalInjects || []).forEach(inj => {
		var mod = (<ModuleType2>inj).moduleName;
		if (!mod || deps.indexOf(mod) !== -1) return;
		deps.push(inj);
	});
	if (deps.length === 0 && !moduleDependencies) {
		return moduleDependencies;
	}
	return deps;
}

let PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
/**
 * Converts all accepted directives format into proper directive name.
 * @param name Name to normalize
 */
export function directiveNormalize(name: string) {
  return camelCase(name.replace(PREFIX_REGEXP, ''));
}

let SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
let MOZ_HACK_REGEXP = /^moz([A-Z])/;
export function camelCase(name: string) {
  return name.
    replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
}