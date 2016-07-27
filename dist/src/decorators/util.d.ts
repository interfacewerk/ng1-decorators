export declare type ModuleType2 = {
    moduleName?: string;
};
export declare type ServiceType2 = {
    service?: string;
};
export declare type InjectType = Array<string | {}>;
export declare type ModuleDependencies = Array<ModuleDependency>;
export declare type ModuleDependency = string | ModuleType2;
export declare function transformModuleDependenciesIntoArrayOfString(deps: ModuleDependencies): string[];
export declare function makeInject($inject: InjectType): string[];
export declare function addMissingDependenciesFrom$Inject(moduleDependencies: ModuleDependencies, optionalInjects: InjectType): (string | {
    moduleName?: string;
})[];
/**
 * Converts all accepted directives format into proper directive name.
 * @param name Name to normalize
 */
export declare function directiveNormalize(name: string): string;
export declare function camelCase(name: string): string;
