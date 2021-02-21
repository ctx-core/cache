import type { Timeout } from '@ctx-core/function';
import { Readable, Writable } from '@ctx-core/store';
export declare function _cache_ctx</*@formatter:off*/ $value_type extends unknown = unknown, opts_data_type extends unknown = unknown>(query: cache_ctx_query_type<$value_type, cache_ctx_ensure_opts_type<opts_data_type>>, _cache_ctx_opts?: _cache_ctx_opts_type): cache_ctx_type<$value_type, opts_data_type>;
export interface _cache_ctx_opts_type {
    period?: number;
    poll?: boolean;
}
export declare type cache_ctx_query_type</*@formatter:off*/ $value_type extends unknown = unknown, opts_data_type extends unknown = unknown> = (id: string, opts_data?: opts_data_type) => Promise<$value_type>;
export interface cache_ctx_ensure_opts_type<opts_data_type extends unknown = unknown> {
    data?: opts_data_type;
    period?: number;
    poll?: boolean;
    force?: boolean;
}
export interface cache_value_type<$value_type extends unknown = unknown> extends Writable<$value_type> {
    promise?: Promise<$value_type>;
    error?: any;
    period?: number;
    poll?: false | number | Timeout;
    expiration?: Date;
}
export declare type $cache_ctx_type<$value_type extends unknown = unknown> = Record<string, cache_value_type<$value_type>>;
export interface cache_ctx_type<$value_type extends unknown = unknown, opts_data_type extends unknown = unknown> extends Readable<$cache_ctx_type<$value_type>> {
    ensure: (id: string, opts?: cache_ctx_ensure_opts_type<opts_data_type>) => Promise<cache_value_type<$value_type>>;
}
