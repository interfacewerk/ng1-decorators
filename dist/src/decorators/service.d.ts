import { InjectType, ModuleDependencies } from './util';
export declare function Service(service: string, params?: {
    $inject?: InjectType;
    moduleName?: string;
    moduleDependencies?: ModuleDependencies;
}): (target: Function & {
    moduleName?: string;
    service?: string;
    $inject?: (string | {})[];
    injections?: {
        [injected: string]: string;
    };
}) => void;
