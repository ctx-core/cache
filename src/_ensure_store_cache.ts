import { get, Writable } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
import type { cache_type } from './cache_type'
export function _ensure_store_cache</*@formatter:off*/
	input_type extends unknown = unknown,
	store_type extends Writable<cache_type<input_type>> = Writable<cache_type<input_type>>,
	query_ctx_type extends unknown = any
>/*@formatter:on*/(
	store:store_type,
	query:(
		this:cache_type<input_type>,
		query_ctx:query_ctx_type,
		id:string
	)=>Promise<input_type>
):ensure_store_cache_type<input_type, query_ctx_type> {
	return async function ensure_store_cache(query_ctx:query_ctx_type, id:string):Promise<input_type> {
		const $store:cache_type<input_type> = get(store)
		const {
			data,
			errors,
			promises
		} = $store
		if (id == null)
			throw_invalid_argument({ key: 'id', } as throw_invalid_argument_ctx_type)
		if (data[id] == null && !errors[id]) {
			if (!promises[id]) {
				promises[id] = query.call($store, query_ctx, id)
			}
			try {
				data[id] = await promises[id]
			} catch (e) {
				console.error(e)
				errors[id] = e
				throw e
			}
		}
		return data[id]
	}
}
export type ensure_store_cache_type</*@formatter:off*/
	input_type extends unknown = unknown,
	query_ctx_type extends unknown = any
>/*@formatter:on*/ = (query_ctx:query_ctx_type, id:string)=>Promise<input_type>
export {
	_ensure_store_cache as _ensure__store__cache
}