import type { Writable } from '@ctx-core/store'
import type { cache_type } from './cache_type'
export function _reload_store_cache</*@formatter:off*/
	I extends unknown = unknown,
	S extends Writable<cache_type<I>> = Writable<cache_type<I>>
>/*@formatter:on*/(store:S) {
	return function reload_store_cache() {
		store.set({
				data: {} as Record<string, I>,
				errors: {} as Record<string, any>,
				promises: {} as Record<string, Promise<I>>,
			} as cache_type<I>
		)
	}
}
export {
	_reload_store_cache as _reload__store__cache
}