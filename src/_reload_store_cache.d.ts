import type { Writable } from '@ctx-core/store';
import type { cache_type } from './cache_type';
export declare function _reload_store_cache</*@formatter:off*/ I extends unknown = unknown, S extends Writable<cache_type<I>> = Writable<cache_type<I>>>(store: S, _data: () => I): () => void;
export { _reload_store_cache as _reload__store__cache };
