import type { nullish, Timeout } from '@ctx-core/function'
import { ReadableAtom_, WritableAtom_ } from '@ctx-core/nanostores'
export declare function cache$_<Key, Val, query_data_T>(
	query:cache$__query_T<Key, Val, query_data_T>,
	cache$__opts?:cache$__opts_T<Key, Val, query_data_T>
):cache$_T<Key, Val, query_data_T>;
export interface cache$__opts_T<Key, Val, query_data_T> {
	id_?:(query_data:query_data_T)=>string;
	init?:cache_init_T<Key, Val>|[Key, Val][]|(()=>cache_init_T<Key, Val>)|(()=>[Key, Val][])
	ttl?:number;
	period?:number;
	poll?:boolean;
}
export type cache_ctx$__opts_T<Key, Val, query_data_T> = cache$__opts_T<Key, Val, query_data_T>
export declare type cache$__query_T<Key, Val, query_data_T> =
	(query_data:query_data_T, opts?:cache$__opts_T<Key, Val, query_data_T>)=>Promise<Val>;
export interface cache$__be_opts_T<Key, Val, query_data_T> extends cache$__opts_T<Key, Val, query_data_T> {
	id?:string;
	ttl?:number;
	period?:number;
	poll?:boolean;
	force?:boolean;
}
export type cache_ctx$__be_opts_T<Key, Val, query_data_T> = cache$__be_opts_T<Key, Val, query_data_T>
export interface cache_value$_T<Val extends unknown = unknown> extends WritableAtom_<Val|nullish> {
	promise?:Promise<Val>;
	promise_rc?:number
	error?:any;
	ttl?:number;
	period?:number;
	poll?:number|Timeout|NodeJS.Timeout|nullish;
	expiration?:Date;
}
export type cache_ctx_value$_T = cache_value$_T
export declare type cache_T<Key, Val> = Map<Key, cache_value$_T<Val>>;
export declare type cache_init_T<Key, Val> = Map<Key, Val>;
export type cache_ctx_T<Key, Val> = cache_T<Key, Val>
export interface cache$_T<Key, Val, query_data_T> extends ReadableAtom_<cache_T<Key, Val>> {
	be:(query_data:query_data_T, opts?:cache$__be_opts_T<Key, Val, query_data_T>)=>cache_value$_T<Val>;
	ensure:(query_data:query_data_T, opts?:cache$__be_opts_T<Key, Val, query_data_T>)=>Promise<cache_value$_T<Val>>;
	ensure_val:(query_data:query_data_T, opts?:cache$__be_opts_T<Key, Val, query_data_T>)=>Promise<Val>;
	set:(id:string, val:Val)=>void
	subscribe_init(listener:(value:cache_init_T<Key, Val>)=>void):()=>void
	to_init:()=>cache_init_T<Key, Val>
}
export type cache_ctx$_T<Key, Val, query_data_T> = cache$_T<Key, Val, query_data_T>
export {
	cache$_ as cache_ctx$_,
	cache$_ as _cache_ctx,
}
