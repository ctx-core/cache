import type { Timeout } from '@ctx-core/function'
import { assign, clone } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$, writable$, Writable$ } from '@ctx-core/store'
export function cache_ctx$_</*@formatter:off*/
	$value_T extends unknown = unknown,
	opts_data_T extends unknown = unknown,
>/*@formatter:on*/(
	query:cache_ctx$__query_T<$value_T, cache_ctx$__be_opts_T<opts_data_T>>,
	cache_ctx$__opts:cache_ctx$__be_opts_T<opts_data_T> = {},
):cache_ctx$_T<$value_T, opts_data_T> {
	const { store: cache_ctx$, set } = readable$_set_ctx_<cache_ctx_T<$value_T>>({})
	return assign(cache_ctx$, {
		be,
		ensure,
	}) as cache_ctx$_T<$value_T, opts_data_T>
	function be(id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}) {
		const cache_ctx_value = base_be(id)
		load(id, opts).then()
		return cache_ctx_value
	}
	async function ensure(
		id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}
	):Promise<cache_ctx_value$_T<$value_T>|undefined> {
		const cache_ctx_value$ = base_be(id)
		await load(id, opts)
		return cache_ctx_value$
	}
	function base_be(id:string):cache_ctx_T<$value_T>[string]|undefined {
		const cache_ctx:cache_ctx_T<$value_T> = cache_ctx$._
		if (!cache_ctx[id]) {
			cache_ctx[id] = cache_ctx_value_()
			set(cache_ctx)
		}
		return cache_ctx[id]
	}
	async function load(id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}) {
		const cache_ctx:cache_ctx_T<$value_T> = cache_ctx$._
		const now = new Date()
		const cache_ctx_value$ = cache_ctx[id]
		const { expiration } = cache_ctx_value$
		let cache_ctx_value = cache_ctx_value$._
		if (
			cache_ctx_value == null
			|| (expiration && expiration < now)
			|| opts.force
		) {
			if (!cache_ctx_value$.promise) {
				cache_ctx_value$.promise = query(id, opts)
			}
			try {
				cache_ctx_value = await cache_ctx_value$.promise
				cache_ctx_value$.set(cache_ctx_value)
				const period = opts?.period || cache_ctx$__opts.period
				cache_ctx_value$.period = period
				if (period) {
					cache_ctx_value$.expiration = new Date(new Date().getTime() + period)
				}
				const poll =
					opts?.poll != null
					? opts.poll
					: cache_ctx$__opts.poll != null
						? cache_ctx$__opts.poll
						: false
				if (poll) {
					cache_ctx_value$.poll = setTimeout(()=>{
						cache_ctx_value$.poll = false
						ensure(id, clone(opts, {
							force: true
						}))
					}, period)
				} else {
					cache_ctx_value$.poll = false
				}
			} catch (e) {
				console.error(e)
				cache_ctx_value$.error = e
				throw e
			}
		}
	}
	function cache_ctx_value_():cache_ctx_value$_T<$value_T> {
		const cache_ctx_value = writable$<$value_T|undefined>(undefined)
		return assign(cache_ctx_value, {}) as cache_ctx_value$_T<$value_T>
	}
}
export interface cache_ctx$__opts_T {
	period?:number
	poll?:boolean
}
export type cache_ctx$__query_T</*@formatter:off*/
	value_type extends unknown = unknown,
	opts_data_type extends unknown = unknown,
>/*@formatter:on*/ = (
	id:string,
	opts_data?:opts_data_type,
)=>Promise<value_type>
export interface cache_ctx$__be_opts_T<opts_data_type extends unknown = unknown> {
	data?:opts_data_type
	period?:number
	poll?:boolean
	force?:boolean
}
export interface cache_ctx_value$_T<$value_type extends unknown = unknown>
	extends Writable$<$value_type> {
	promise?:Promise<$value_type>
	error?:any
	period?:number
	poll?:false|number|Timeout
	expiration?:Date
}
export type cache_ctx_T<$value_type extends unknown = unknown> =
	Record<string, cache_ctx_value$_T<$value_type>>
export interface cache_ctx$_T<$value_type extends unknown = unknown, opts_data_type extends unknown = unknown>
	extends Readable$<cache_ctx_T<$value_type>> {
	be:(id:string, opts?:cache_ctx$__be_opts_T<opts_data_type>)=>cache_ctx_value$_T<$value_type>
	ensure:(id:string, opts?:cache_ctx$__be_opts_T<opts_data_type>)=>Promise<cache_ctx_value$_T<$value_type>>
}
export {
	cache_ctx$_ as _cache_ctx,
}