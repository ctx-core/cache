import { get, Writable } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
import type { $cache_store_type } from './$cache_store_type'
export function _ensure_cache_store</*@formatter:off*/
	input_type extends unknown = unknown,
	store_type extends Writable<$cache_store_type<input_type>> = Writable<$cache_store_type<input_type>>,
	query_ctx_type extends unknown = any
>/*@formatter:on*/(
	store:store_type,
	query:ensure_cache_query_type<input_type, query_ctx_type>
):ensure_cache_store_type<query_ctx_type, input_type> {
	return async function ensure_cache_store(query_ctx:query_ctx_type, id:string):Promise<input_type> {
		const $cache_store:$cache_store_type<input_type> = get(store)
		const {
			data,
			errors,
			promises
		} = $cache_store
		if (id == null)
			throw_invalid_argument({ key: 'id', } as throw_invalid_argument_ctx_type)
		if (data[id] == null && !errors[id]) {
			if (!promises[id]) {
				promises[id] = query.call($cache_store, query_ctx, id)
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
export type ensure_cache_query_type</*@formatter:off*/
	input_type extends unknown = unknown,
	query_ctx_type extends unknown = any,
>/*@formatter:on*/ = (
	this:$cache_store_type<input_type>,
	query_ctx:query_ctx_type,
	id:string
)=>Promise<input_type>
export type ensure_cache_store_type</*@formatter:off*/
	query_ctx_type extends unknown = any,
	input_type extends unknown = unknown,
>/*@formatter:on*/ = (query_ctx:query_ctx_type, id:string)=>Promise<input_type>
export {
	_ensure_cache_store as _ensure_store_cache,
	_ensure_cache_store as _ensure__store__cache,
}