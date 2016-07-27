import { InjectType } from './util';
export declare function Config($inject: InjectType, config: Function & {
    $inject: string[];
}): (target: {
    moduleName: string;
}) => void;
