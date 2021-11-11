import type { nullish, Timeout } from '@ctx-core/function'
import { assign, clone } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$, writable$, Writable$ } from '@ctx-core/store'
export function cache_ctx$_</*@formatter:off*/
	Val extends unknown = unknown,
	opts_data_T extends unknown = unknown,
>/*@formatter:on*/(
	query:cache_ctx$__query_T<Val, cache_ctx$__be_opts_T<opts_data_T>>,
	cache_ctx$__opts:cache_ctx$__be_opts_T<opts_data_T> = {},
):cache_ctx$_T<Val, opts_data_T> {
	const { store: cache_ctx$, set } = readable$_set_ctx_<cache_ctx_T<Val>>({})
	return assign(cache_ctx$, {
		be,
		ensure,
		ensure_val,
	}) as cache_ctx$_T<Val, opts_data_T>
	function be(id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}) {
		const cache_ctx_value$ = base_be(id)
		load(id, opts).then()
		return cache_ctx_value$
	}
	async function ensure(
		id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}
	):Promise<cache_ctx_value$_T<Val>> {
		const cache_ctx_value$ = base_be(id)
		await load(id, opts)
		return cache_ctx_value$
	}
	async function ensure_val(
		id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}
	):Promise<Val|nullish> {
		return (await ensure(id, opts)).$
	}
	function base_be(id:string):cache_ctx_T<Val>[string] {
		const cache_ctx:cache_ctx_T<Val> = cache_ctx$.$
		if (!cache_ctx[id]) {
			cache_ctx[id] = cache_ctx_val_()
			set(cache_ctx)
		}
		return cache_ctx[id]
	}
	async function load(id:string, opts:cache_ctx$__be_opts_T<opts_data_T> = {}) {
		const cache_ctx:cache_ctx_T<Val> = cache_ctx$.$
		const now = new Date()
		const cache_ctx_value$ = cache_ctx[id]
		const { expiration } = cache_ctx_value$
		let cache_ctx_value = cache_ctx_value$.$
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
						: undefined
				if (poll) {
					cache_ctx_value$.poll = setTimeout(()=>{
						cache_ctx_value$.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, period)
				} else {
					cache_ctx_value$.poll = null
				}
			} catch (e) {
				console.error(e)
				cache_ctx_value$.error = e
				throw e
			}
		}
	}
	function cache_ctx_val_():cache_ctx_value$_T<Val> {
		return writable$<Val|undefined>(undefined) as cache_ctx_value$_T<Val>
	}
}
export interface cache_ctx$__opts_T {
	period?:number
	poll?:boolean
}
export type cache_ctx$__query_T</*@formatter:off*/
	Val extends unknown = unknown,
	opts_data_T extends unknown = unknown,
>/*@formatter:on*/ = (
	id:string,
	opts_data?:opts_data_T,
)=>Promise<Val>
export interface cache_ctx$__be_opts_T<opts_data_T extends unknown = unknown> {
	data?:opts_data_T
	period?:number
	poll?:boolean
	force?:boolean
}
export interface cache_ctx_value$_T<Val extends unknown = unknown>
	extends Writable$<Val|nullish> {
	promise?:Promise<Val>
	error?:any
	period?:number
	poll?:number|Timeout|nullish
	expiration?:Date
}
export type cache_ctx_T<Val extends unknown = unknown> =
	Record<string, cache_ctx_value$_T<Val>>
export interface cache_ctx$_T<Val extends unknown = unknown, opts_data_T extends unknown = unknown>
	extends Readable$<cache_ctx_T<Val>> {
	be:
		(id:string, opts?:cache_ctx$__be_opts_T<opts_data_T>)=>
			cache_ctx_value$_T<Val>
	ensure:
		(id:string, opts?:cache_ctx$__be_opts_T<opts_data_T>)=>
			Promise<cache_ctx_value$_T<Val>|nullish>
	ensure_val:
		(id:string, opts?:cache_ctx$__be_opts_T<opts_data_T>)=>
			Promise<Val|nullish>
}
export {
	cache_ctx$_ as _cache_ctx,
}
