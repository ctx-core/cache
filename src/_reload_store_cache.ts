import type { $cache_store_type, cache_store_type } from './cache_store_type'
export function _reload_store_cache<I extends object = object>(store: cache_store_type<I>) {
	return function reload_store_cache() {
		store.set({ data: {} as I, promise_a1: [] as Promise<I>[] } as $cache_store_type<I>)
	}
}
export {
	_reload_store_cache as _reload__store__cache
}