import { get } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
import type { $cache_store_type, cache_store_type } from './cache_store_type'
export function _ensure_store_cache<I extends object>(store: cache_store_type<I>, query) {
	return async function ensure_store_cache(query_ctx, id) {
		const $store:$cache_store_type<I> = get(store)
		const {
			data,
			promise_a1
		} = $store
		if (id == null)
			throw_invalid_argument({ key: 'id', } as throw_invalid_argument_ctx_type)
		const datum = data[id]
		if (datum == null && datum !== false) {
			if (!promise_a1[id]) {
				promise_a1[id] = query.call($store, query_ctx, id)
			}
			try {
				data[id] = await promise_a1[id]
			} catch (e) {
				console.error(e)
				data[id] = false
			}
		}
		return data[id]
	}
}
export {
	_ensure_store_cache as _ensure__store__cache
}