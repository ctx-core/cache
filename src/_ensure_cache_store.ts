import { get, Readable } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
import type { $cache_store_type } from './$cache_store_type'
export function _ensure_cache_store</*@formatter:off*/
	input_type extends unknown = unknown,
	store_type extends Readable<$cache_store_type<input_type>> = Readable<$cache_store_type<input_type>>,
	query_ctx_type extends unknown = any
>/*@formatter:on*/(
	store:store_type,
	query:ensure_cache_query_type<input_type, query_ctx_type>
):ensure_cache_store_type<query_ctx_type, input_type> {
	return async function ensure_cache_store(id:string, query_ctx?:query_ctx_type):Promise<input_type> {
		const $cache_store:$cache_store_type<input_type> = get(store)
		const {
			data,
			errors,
			promises
		} = $cache_store
		if (!id) throw_invalid_argument({ key: 'id', value: id } as throw_invalid_argument_ctx_type)
		if (data[id] == null && !errors[id]) {
			if (!promises[id]) {
				promises[id] = query.call($cache_store, id, query_ctx)
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
	id:string,
	query_ctx?:query_ctx_type,
)=>Promise<input_type>
export type ensure_cache_store_type</*@formatter:off*/
	query_ctx_type extends unknown = any,
	input_type extends unknown = unknown,
>/*@formatter:on*/ = (id:string, query_ctx?:query_ctx_type)=>Promise<input_type>
export {
	_ensure_cache_store as _ensure_store_cache,
	_ensure_cache_store as _ensure__store__cache,
}