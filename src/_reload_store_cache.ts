import type { Writable } from '@ctx-core/store'
import type { cache_type } from './cache_type'
export function _reload_store_cache</*@formatter:off*/
	I extends unknown = unknown,
	S extends Writable<cache_type<I>> = Writable<cache_type<I>>
>/*@formatter:on*/(
	store:S, _data:()=>I
) {
	return function reload_store_cache() {
		store.set({ data: _data(), promise_a1: [] as Promise<I>[] } as cache_type<I>)
	}
}
export {
	_reload_store_cache as _reload__store__cache
}