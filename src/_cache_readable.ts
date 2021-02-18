import { assign } from '@ctx-core/object'
import { _readable_set_ctx, Readable } from '@ctx-core/store'
import type { $cache_store_type } from './$cache_store_type'
import type { ensure_cache_query_type } from './_ensure_cache_store'
import { _reload_store_cache, reload_store_cache_type } from './_reload_cache_store'
import { _ensure_store_cache, ensure_cache_store_type } from './_ensure_cache_store'
export function _cache_readable</*@formatter:off*/
	input_type extends unknown = unknown,
	query_ctx_type extends unknown = any,
	store_type extends cache_readable_type<input_type, query_ctx_type> = cache_readable_type<input_type, query_ctx_type>,
>/*@formatter:on*/(query:ensure_cache_query_type<input_type, query_ctx_type>):store_type {
	const { store, set } = _readable_set_ctx<$cache_store_type<input_type>>(
		{ data: {}, errors: {}, promises: {} } as $cache_store_type<input_type>
	)
	const reload = _reload_store_cache<input_type>(set)
	reload()
	const ensure = _ensure_store_cache(store, query)
	return assign(store, {
		reload,
		ensure,
	}) as store_type
	return store as store_type
}
export interface cache_readable_type<input_type extends unknown = unknown, query_ctx_type extends unknown = any>
	extends Readable<$cache_store_type<input_type>> {
	reload:reload_store_cache_type
	ensure:ensure_cache_store_type<query_ctx_type, input_type>
}