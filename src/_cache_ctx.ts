import type { Timeout } from '@ctx-core/function'
import { assign, clone } from '@ctx-core/object'
import { _readable_set_ctx, get, Readable, writable, Writable } from '@ctx-core/store'
import { throw_invalid_argument, throw_invalid_argument_ctx_type } from '@ctx-core/error'
export function _cache_ctx</*@formatter:off*/
	$value_type extends unknown = unknown,
	opts_data_type extends unknown = unknown,
>/*@formatter:on*/(
	query:cache_ctx_query_type<$value_type, cache_ctx_ensure_opts_type<opts_data_type>>,
	_cache_ctx_opts:_cache_ctx_opts_type = {},
):cache_ctx_type<$value_type, opts_data_type> {
	const { store: cache_ctx, set } = _readable_set_ctx<$cache_ctx_type<$value_type>>({})
	return assign(cache_ctx, {
		ensure,
	}) as cache_ctx_type<$value_type, opts_data_type>
	async function ensure(
		id:string, opts:cache_ctx_ensure_opts_type<opts_data_type> = {}
	):Promise<cache_value_type<$value_type>> {
		if (!id) throw_invalid_argument({ key: 'id', value: id } as throw_invalid_argument_ctx_type)
		const $cache_ctx:$cache_ctx_type<$value_type> = get(cache_ctx)
		const now = new Date()
		if (!$cache_ctx[id]) {
			$cache_ctx[id] = _value()
			set($cache_ctx)
		}
		const cache_value = $cache_ctx[id]
		const { expiration } = cache_value
		let $cache_value = get(cache_value)
		if (
			$cache_value == null
			|| (expiration && expiration < now)
			|| opts.force
		) {
			if (!cache_value.promise) {
				cache_value.promise = query(id, opts)
			}
			try {
				$cache_value = await cache_value.promise
				cache_value.set($cache_value)
				const period = opts?.period || _cache_ctx_opts.period
				cache_value.period = period
				if (period) {
					cache_value.expiration = new Date(new Date().getTime() + period)
				}
				const poll =
					opts?.poll != null
					? opts.poll
					: _cache_ctx_opts.poll != null
						? _cache_ctx_opts.poll
						: false
				if (poll) {
					cache_value.poll = setTimeout(()=>{
						cache_value.poll = false
						ensure(id, clone(opts, {
							force: true
						}))
					}, period)
				} else {
					cache_value.poll = false
				}
			} catch (e) {
				console.error(e)
				cache_value.error = e
				throw e
			}
		}
		return cache_value as cache_value_type<$value_type>
	}
	function _value():cache_value_type<$value_type> {
		const cache_frame = writable(null)
		return assign(cache_frame, {}) as cache_value_type<$value_type>
	}
}
export interface _cache_ctx_opts_type {
	period?:number
	poll?:boolean
}
export type cache_ctx_query_type</*@formatter:off*/
	$value_type extends unknown = unknown,
	opts_data_type extends unknown = unknown,
>/*@formatter:on*/ = (
	id:string,
	opts_data?:opts_data_type,
)=>Promise<$value_type>
export interface cache_ctx_ensure_opts_type<opts_data_type extends unknown = unknown> {
	data?:opts_data_type
	period?:number
	poll?:boolean
	force?:boolean
}
export interface cache_value_type<$value_type extends unknown = unknown>
	extends Writable<$value_type> {
	promise?:Promise<$value_type>
	error?:any
	period?:number
	poll?:false|number|Timeout
	expiration?:Date
}
export type $cache_ctx_type<$value_type extends unknown = unknown> =
	Record<string, cache_value_type<$value_type>>
export interface cache_ctx_type<$value_type extends unknown = unknown, opts_data_type extends unknown = unknown>
	extends Readable<$cache_ctx_type<$value_type>> {
	ensure:(
		id:string,
		opts?:cache_ctx_ensure_opts_type<opts_data_type>
	)=>Promise<cache_value_type<$value_type>>
}
