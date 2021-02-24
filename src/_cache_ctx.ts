import type { Timeout } from '@ctx-core/function'
import { assign, clone } from '@ctx-core/object'
import { _readable_set_ctx, get, Readable, writable, Writable } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_T } from '@ctx-core/error'
export function _cache_ctx</*@formatter:off*/
	$value_T extends unknown = unknown,
	opts_data_T extends unknown = unknown,
>/*@formatter:on*/(
	query:cache_ctx_query_T<$value_T, cache_ctx_be_opts_T<opts_data_T>>,
	_cache_ctx_opts:_cache_ctx_opts_T = {},
):cache_ctx_T<$value_T, opts_data_T> {
	const { store: cache_ctx, set } = _readable_set_ctx<$cache_ctx_T<$value_T>>({})
	return assign(cache_ctx, {
		be,
		ensure,
	}) as cache_ctx_T<$value_T, opts_data_T>
	function be(id:string, opts:cache_ctx_be_opts_T<opts_data_T> = {}) {
		const cache_ctx_value = base_be(id)
		load(id, opts).then()
		return cache_ctx_value
	}
	async function ensure(
		id:string, opts:cache_ctx_be_opts_T<opts_data_T> = {}
	):Promise<cache_ctx_value_T<$value_T>> {
		const cache_ctx_value = base_be(id)
		await load(id, opts)
		return cache_ctx_value
	}
	function base_be(id:string) {
		if (!id) throw_invalid_argument({ key: 'id', value: id } as throw_invalid_argument_ctx_T)
		const $cache_ctx:$cache_ctx_T<$value_T> = get(cache_ctx)
		if (!$cache_ctx[id]) {
			$cache_ctx[id] = _cache_ctx_value()
			set($cache_ctx)
		}
		return $cache_ctx[id]
	}
	async function load(id:string, opts:cache_ctx_be_opts_T<opts_data_T> = {}) {
		const $cache_ctx:$cache_ctx_T<$value_T> = get(cache_ctx)
		const now = new Date()
		const cache_ctx_value = $cache_ctx[id]
		const { expiration } = cache_ctx_value
		let $cache_value = get(cache_ctx_value)
		if (
			$cache_value == null
			|| (expiration && expiration < now)
			|| opts.force
		) {
			if (!cache_ctx_value.promise) {
				cache_ctx_value.promise = query(id, opts)
			}
			try {
				$cache_value = await cache_ctx_value.promise
				cache_ctx_value.set($cache_value)
				const period = opts?.period || _cache_ctx_opts.period
				cache_ctx_value.period = period
				if (period) {
					cache_ctx_value.expiration = new Date(new Date().getTime() + period)
				}
				const poll =
					opts?.poll != null
					? opts.poll
					: _cache_ctx_opts.poll != null
						? _cache_ctx_opts.poll
						: false
				if (poll) {
					cache_ctx_value.poll = setTimeout(()=>{
						cache_ctx_value.poll = false
						ensure(id, clone(opts, {
							force: true
						}))
					}, period)
				} else {
					cache_ctx_value.poll = false
				}
			} catch (e) {
				console.error(e)
				cache_ctx_value.error = e
				throw e
			}
		}
	}
	function _cache_ctx_value():cache_ctx_value_T<$value_T> {
		const cache_ctx_value = writable(null)
		return assign(cache_ctx_value, {}) as cache_ctx_value_T<$value_T>
	}
}
export interface _cache_ctx_opts_T {
	period?:number
	poll?:boolean
}
export type _cache_ctx_opts_type = _cache_ctx_opts_T
export type cache_ctx_query_T</*@formatter:off*/
	$value_type extends unknown = unknown,
	opts_data_type extends unknown = unknown,
>/*@formatter:on*/ = (
	id:string,
	opts_data?:opts_data_type,
)=>Promise<$value_type>
export type cache_ctx_query_type = cache_ctx_query_T
export interface cache_ctx_be_opts_T<opts_data_type extends unknown = unknown> {
	data?:opts_data_type
	period?:number
	poll?:boolean
	force?:boolean
}
export type cache_ctx_be_opts_type = cache_ctx_be_opts_T
export interface cache_ctx_value_T<$value_type extends unknown = unknown>
	extends Writable<$value_type> {
	promise?:Promise<$value_type>
	error?:any
	period?:number
	poll?:false|number|Timeout
	expiration?:Date
}
export type cache_ctx_value_type = cache_ctx_value_T
export type $cache_ctx_T<$value_type extends unknown = unknown> =
	Record<string, cache_ctx_value_T<$value_type>>
export type $cache_ctx_type = $cache_ctx_T
export interface cache_ctx_T<$value_type extends unknown = unknown, opts_data_type extends unknown = unknown>
	extends Readable<$cache_ctx_T<$value_type>> {
	be:(id:string, opts?:cache_ctx_be_opts_T<opts_data_type>)=>cache_ctx_value_T<$value_type>
	ensure:(id:string, opts?:cache_ctx_be_opts_T<opts_data_type>)=>Promise<cache_ctx_value_T<$value_type>>
}
export type cache_ctx_type = cache_ctx_T
