import type { Writable } from '@ctx-core/store';
import type { $cache_store_type } from './$cache_store_type';
export declare function _reload_cache_store</*@formatter:off*/ I extends unknown = unknown, S extends Writable<$cache_store_type<I>> = Writable<$cache_store_type<I>>>(store: S): reload_store_cache_type;
export declare type reload_store_cache_type = () => void;
export { _reload_cache_store as _reload_store_cache, _reload_cache_store as _reload__store__cache, };
