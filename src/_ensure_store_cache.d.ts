import type { nf } from '@ctx-core/function';
import { Writable } from '@ctx-core/store';
import type { cache_type } from './cache_type';
export declare function _ensure_store_cache</*@formatter:off*/ input_type extends unknown = unknown, store_type extends Writable<cache_type<input_type>> = Writable<cache_type<input_type>>, query_ctx_type extends unknown = any>(store: store_type, query: (this: cache_type<input_type>, query_ctx: query_ctx_type, id: string) => Promise<input_type>): (query_ctx: any, id: any) => Promise<nf | input_type>;
export { _ensure_store_cache as _ensure__store__cache };
