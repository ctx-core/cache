import { Writable } from '@ctx-core/store';
import type { cache_type } from './cache_type';
export declare function _ensure_store_cache<I extends unknown = unknown, S extends Writable<cache_type<I>> = Writable<cache_type<I>>>(store: S, query: any): (query_ctx: any, id: any) => Promise<any>;
export { _ensure_store_cache as _ensure__store__cache };
