import { get } from 'svelte/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
export function _reload__store__cache(store) {
	return function reload__store__cache() {
		store.set({ data: {}, promise_a1: {} })
	}
}
export function _ensure__store__cache(__store, query) {
	return async function ensure__store__cache(query_ctx, id) {
		const store = get(__store)
		const {
			data,
			promise_a1
		} = store
		if (id == null)
			throw_invalid_argument({ key: 'id', } as throw_invalid_argument_ctx_type)
		const datum = data[id]
		if (datum == null && datum !== false) {
			if (!promise_a1[id]) {
				promise_a1[id] = query.call(store, query_ctx, id)
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
