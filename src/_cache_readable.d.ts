import { Readable } from '@ctx-core/store';
import type { $cache_store_type } from './$cache_store_type';
import type { ensure_cache_query_type } from './_ensure_cache_store';
import { reload_store_cache_type } from './_reload_cache_store';
import { ensure_cache_store_type } from './_ensure_cache_store';
export declare function _cache_readable</*@formatter:off*/ input_type extends unknown = unknown, query_ctx_type extends unknown = any, store_type extends cache_readable_type<input_type, query_ctx_type> = cache_readable_type<input_type, query_ctx_type>>(query: ensure_cache_query_type<input_type, query_ctx_type>): store_type;
export interface cache_readable_type<input_type extends unknown = unknown, query_ctx_type extends unknown = any> extends Readable<$cache_store_type<input_type>> {
    reload: reload_store_cache_type;
    ensure: ensure_cache_store_type<query_ctx_type, input_type>;
}
