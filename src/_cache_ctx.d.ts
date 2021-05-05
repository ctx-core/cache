import type { Timeout } from '@ctx-core/function';
import { Readable$, Writable$ } from '@ctx-core/store';
export declare function _cache_ctx</*@formatter:off*/ $value_T extends unknown = unknown, opts_data_T extends unknown = unknown>(query: cache_ctx_query_T<$value_T, cache_ctx_be_opts_T<opts_data_T>>, _cache_ctx_opts?: _cache_ctx_opts_T): cache_ctx_T<$value_T, opts_data_T>;
export interface _cache_ctx_opts_T {
    period?: number;
    poll?: boolean;
}
export declare type _cache_ctx_opts_type = _cache_ctx_opts_T;
export declare type cache_ctx_query_T</*@formatter:off*/ $value_type extends unknown = unknown, opts_data_type extends unknown = unknown> = (id: string, opts_data?: opts_data_type) => Promise<$value_type>;
export declare type cache_ctx_query_type = cache_ctx_query_T;
export interface cache_ctx_be_opts_T<opts_data_type extends unknown = unknown> {
    data?: opts_data_type;
    period?: number;
    poll?: boolean;
    force?: boolean;
}
export declare type cache_ctx_be_opts_type = cache_ctx_be_opts_T;
export interface cache_ctx_value_T<$value_type extends unknown = unknown> extends Writable$<$value_type> {
    promise?: Promise<$value_type>;
    error?: any;
    period?: number;
    poll?: false | number | Timeout;
    expiration?: Date;
}
export declare type cache_ctx_value_type = cache_ctx_value_T;
export declare type $cache_ctx_T<$value_type extends unknown = unknown> = Record<string, cache_ctx_value_T<$value_type>>;
export declare type $cache_ctx_type = $cache_ctx_T;
export interface cache_ctx_T<$value_type extends unknown = unknown, opts_data_type extends unknown = unknown> extends Readable$<$cache_ctx_T<$value_type>> {
    be: (id: string, opts?: cache_ctx_be_opts_T<opts_data_type>) => cache_ctx_value_T<$value_type>;
    ensure: (id: string, opts?: cache_ctx_be_opts_T<opts_data_type>) => Promise<cache_ctx_value_T<$value_type>>;
}
export declare type cache_ctx_type = cache_ctx_T;
