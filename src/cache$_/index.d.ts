import type { nullish, Timeout } from '@ctx-core/function'
import { ReadableAtom$, WritableAtom$ } from '@ctx-core/nanostores'
export declare function cache$_<Val extends unknown = unknown, query_data_T extends unknown = unknown>(
	query:cache$__query_T<Val, query_data_T>,
	cache$__opts?:cache$__opts_T<Val, query_data_T>
):cache$_T<Val, query_data_T>;
export interface cache$__opts_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> {
	id_?:(query_data:query_data_T)=>string;
	init?:cache_init_T<Val>
	ttl?:number;
	period?:number;
	poll?:boolean;
}
export type cache_ctx$__opts_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> =
	cache$__opts_T<Val, query_data_T>
export declare type cache$__query_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> =
	(query_data:query_data_T, opts?:cache$__opts_T<Val, query_data_T>)=>Promise<Val>;
export interface cache$__be_opts_T<Val, query_data_T> extends cache$__opts_T<Val, query_data_T> {
	id?:string;
	ttl?:number;
	period?:number;
	poll?:boolean;
	force?:boolean;
}
export type cache_ctx$__be_opts_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> =
	cache$__be_opts_T<Val, query_data_T>
export interface cache_value$_T<Val extends unknown = unknown> extends WritableAtom$<Val|nullish> {
	promise?:Promise<Val>;
	promise_rc?:number
	error?:any;
	ttl?:number;
	period?:number;
	poll?:number|Timeout|NodeJS.Timeout|nullish;
	expiration?:Date;
}
export type cache_ctx_value$_T = cache_value$_T
export declare type cache_T<Val extends unknown = unknown> = Record<string, cache_value$_T<Val>>;
export declare type cache_init_T<Val extends unknown = unknown> = Record<string, Val>|(()=>Record<string, Val>);
export type cache_ctx_T = cache_T
export interface cache$_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> extends ReadableAtom$<cache_T<Val>> {
	be:(query_data:query_data_T, opts?:cache$__be_opts_T<Val, query_data_T>)=>cache_value$_T<Val>;
	ensure:(query_data:query_data_T, opts?:cache$__be_opts_T<Val, query_data_T>)=>Promise<cache_value$_T<Val>|nullish>;
	ensure_val:(query_data:query_data_T, opts?:cache$__be_opts_T<Val, query_data_T>)=>Promise<Val|nullish>;
	set:(id:string, val:Val)=>void
}
export type cache_ctx$_T = cache$_T
export {
	cache$_ as cache_ctx$_,
	cache$_ as _cache_ctx,
}
