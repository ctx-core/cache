import type { Writable } from '@ctx-core/store';
export declare type $cache_store_type<I extends object> = {
    data: I;
    promise_a1: Promise<I>[];
};
export declare type cache_store_type<I extends object> = Writable<$cache_store_type<I>>;
