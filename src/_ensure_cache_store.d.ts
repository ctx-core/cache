import { Writable } from '@ctx-core/store';
import type { $cache_store_type } from './$cache_store_type';
export declare function _ensure_cache_store</*@formatter:off*/ input_type extends unknown = unknown, store_type extends Writable<$cache_store_type<input_type>> = Writable<$cache_store_type<input_type>>, query_ctx_type extends unknown = any>(store: store_type, query: ensure_cache_query_type<input_type, query_ctx_type>): ensure_cache_store_type<query_ctx_type, input_type>;
export declare type ensure_cache_query_type</*@formatter:off*/ input_type extends unknown = unknown, query_ctx_type extends unknown = any> = (this: $cache_store_type<input_type>, id: string, query_ctx?: query_ctx_type) => Promise<input_type>;
export declare type ensure_cache_store_type</*@formatter:off*/ query_ctx_type extends unknown = any, input_type extends unknown = unknown> = (id: string, query_ctx?: query_ctx_type) => Promise<input_type>;
export { _ensure_cache_store as _ensure_store_cache, _ensure_cache_store as _ensure__store__cache, };
