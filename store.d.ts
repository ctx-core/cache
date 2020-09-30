import type { cache_store_type } from './cache_store_type';
export declare function _ensure_store_cache<I extends object>(store: cache_store_type<I>, query: any): (query_ctx: any, id: any) => Promise<any>;
export declare const _ensure__store__cache: typeof _ensure_store_cache;
