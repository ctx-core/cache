import type { Writable } from '@ctx-core/store'
import type { $cache_store_type } from './$cache_store_type'
export function _reload_cache_store</*@formatter:off*/
	input_type extends unknown = unknown,
	store_type extends Writable<$cache_store_type<input_type>> = Writable<$cache_store_type<input_type>>
>/*@formatter:on*/(store:store_type):reload_store_cache_type {
	return function reload_cache_store() {
		store.set({
				data: {} as Record<string, input_type>,
				errors: {} as Record<string, any>,
				promises: {} as Record<string, Promise<input_type>>,
			} as $cache_store_type<input_type>
		)
	}
}
export type reload_store_cache_type = ()=>void
export {
	_reload_cache_store as _reload_store_cache,
	_reload_cache_store as _reload__store__cache,
}