import { InjectType, ModuleDependencies } from './util';
export declare function Filter(filter: string, params: {
    filter: ((...args: any[]) => Function) & {
        $inject: string[];
    };
    $inject: InjectType;
    moduleName?: string;
    moduleDependencies?: ModuleDependencies;
}): (target: Function & {
    moduleName?: string;
    filter?: string;
    $inject?: string[];
}) => void;
