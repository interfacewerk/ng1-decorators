import { ModuleDependencies } from './util';
export declare function AngularModule(moduleName: string, moduleDependencies?: ModuleDependencies): ng.IModule;
export declare function Module(moduleName: string, moduleDependencies?: ModuleDependencies): (target: Function & {
    moduleName?: string;
}) => void;
export declare function makeAngularModuleIfNecessary(moduleNameIfNotProvided: string, target: Function & {
    moduleName?: string;
}, params: {
    moduleName?: string;
    moduleDependencies?: ModuleDependencies;
}): ng.IModule;
