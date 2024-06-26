import type { nullish, Timeout } from 'ctx-core/function'
import type { memo_T, sig_T } from 'ctx-core/rmemo'
export declare function cache$__new<
	Key,
	Val,
	query_data_T
>(
	query:cache___query_T<Key, Val, query_data_T>,
	cache___params?:cache___params_T<Key, Val, query_data_T>
):cache$_T<Key, Val, query_data_T>
export {
	cache$__new as cache$_,
	cache$__new as cache_ctx$_,
	cache$__new as _cache_ctx,
}
export type cache$_<Key, Val, query_data_T> = typeof cache$__new<Key, Val, query_data_T>
export interface cache___params_T<
	Key, Val, query_data_T
> {
	id_?:(query_data:query_data_T)=>string
	init?:cache_init_T<Key, Val>|[Key, Val][]|(()=>cache_init_T<Key, Val>)|(()=>[Key, Val][])
	ttl?:number
	period?:number
	poll?:boolean
}
export type cache___opts_T<Key, Val, query_data_T> = cache___params_T<Key, Val, query_data_T>
export type cache$__opts_T<Key, Val, query_data_T> = cache___params_T<Key, Val, query_data_T>
export type cache_ctx$__opts_T<Key, Val, query_data_T> = cache___params_T<Key, Val, query_data_T>
export declare type cache___query_T<
	Key, Val, query_data_T
> =
	(query_data:query_data_T, params?:cache___params_T<Key, Val, query_data_T>)=>Promise<Val>
export declare type cache$__query_T<Key, Val, query_data_T> = cache___query_T<Key, Val, query_data_T>
export interface cache___be_params_T<
	Key, Val, query_data_T
> extends cache___params_T<Key, Val, query_data_T> {
	id?:string
	ttl?:number
	period?:number
	poll?:boolean
	force?:boolean
}
export type cache$__be_params_T<Key, Val, query_data_T> = cache___be_params_T<Key, Val, query_data_T>
export type cache_ctx$__be_params_T<Key, Val, query_data_T> = cache___be_params_T<Key, Val, query_data_T>
export interface cache_value__T<
	Val = unknown
> extends sig_T<Val|nullish> {
	promise?:Promise<Val>
	promise_rc?:number
	error?:unknown
	ttl?:number
	period?:number
	poll?:number|Timeout|NodeJS.Timeout|nullish
	expiration?:Date
}
export type cache_value$_T<Val = unknown> = cache_value__T<Val>
export type cache_ctx_value$_T<Val = unknown> = cache_value__T<Val>
export type cache_T<Key, Val> = Map<Key, cache_value__T<Val>>
export type cache_init_T<Key, Val> = Map<Key, Val>
export type cache_ctx_T<Key, Val> = cache_T<Key, Val>
export interface cache$_T<
	Key, Val, query_data_T
> extends memo_T<cache_T<Key, Val>> {
	be(
		query_data:query_data_T,
		params?:cache___be_params_T<Key, Val, query_data_T>
	):cache_value__T<Val>
	ensure(
		query_data:query_data_T,
		params?:cache___be_params_T<Key, Val, query_data_T>
	):Promise<cache_value__T<Val>>
	ensure_val(
		query_data:query_data_T,
		params?:cache___be_params_T<Key, Val, query_data_T>
	):Promise<Val>
	set(id:string, val:Val):void
	subscribe_init(
		listener:(value:cache_init_T<Key, Val>)=>void
	):()=>void
	to_init():cache_init_T<Key, Val>
}
export type cache__T<Key, Val, query_data_T> = cache$_T<Key, Val, query_data_T>
export type cache_ctx$_T<Key, Val, query_data_T> = cache$_T<Key, Val, query_data_T>
