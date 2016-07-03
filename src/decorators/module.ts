import {ModuleDependencies, transformModuleDependenciesIntoArrayOfString} from './util';

export function AngularModule(
	moduleName: string,
	moduleDependencies?: ModuleDependencies): ng.IModule
{
	if (moduleDependencies) {
		var deps = transformModuleDependenciesIntoArrayOfString(moduleDependencies) || [];
		// console.log(`Registering module ${moduleName} with ${deps}`);		
		return angular.module(moduleName, deps);
	} else {
		return angular.module(
			moduleName
		);	
	}
}

export function Module(
	moduleName: string,
	moduleDependencies?: ModuleDependencies
) {
	return function(target: Function & {
		moduleName?: string
	}) {
		target.moduleName = moduleName;
		AngularModule(moduleName, moduleDependencies)		
	}
}

export function makeAngularModuleIfNecessary(
	moduleNameIfNotProvided: string, 
	target: Function & {
		moduleName?: string
	}, params: {
		moduleName?: string,
		moduleDependencies?: ModuleDependencies
	}
): ng.IModule {
	if (params.moduleName) {
		target.moduleName = params.moduleName;
		return AngularModule(target.moduleName, params.moduleDependencies);
	}
	if (target.moduleName) {
		return AngularModule(target.moduleName, params.moduleDependencies);		
	} else {
		target.moduleName = moduleNameIfNotProvided;		
		return AngularModule(target.moduleName, params.moduleDependencies || []);
	}
}