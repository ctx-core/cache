import type { nullish, Timeout } from '@ctx-core/function'
import { ReadableAtom$, WritableAtom$ } from '@ctx-core/nanostores'
export declare function cache_ctx$_<Val extends unknown = unknown, query_data_T extends unknown = unknown>(
	query:cache_ctx$__query_T<Val, query_data_T>,
	cache_ctx$__opts?:cache_ctx$__opts_T<query_data_T>
):cache_ctx$_T<Val, query_data_T>;
export interface cache_ctx$__opts_T<query_data_T extends unknown = unknown> {
	id_?:(query_data:query_data_T)=>string;
	ttl?:number;
	period?:number;
	poll?:boolean;
}
export declare type cache_ctx$__query_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> =
	(query_data:query_data_T, opts?:cache_ctx$__opts_T)=>Promise<Val>;
export interface cache_ctx$__be_opts_T extends cache_ctx$__opts_T {
	id?:string;
	ttl?:number;
	period?:number;
	poll?:boolean;
	force?:boolean;
}
export interface cache_ctx_value$_T<Val extends unknown = unknown> extends WritableAtom$<Val|nullish> {
	promise?:Promise<Val>;
	promise_rc?:number
	error?:any;
	ttl?:number;
	period?:number;
	poll?:number|Timeout|NodeJS.Timeout|nullish;
	expiration?:Date;
}
export declare type cache_ctx_T<Val extends unknown = unknown> = Record<string, cache_ctx_value$_T<Val>>;
export interface cache_ctx$_T<Val extends unknown = unknown, query_data_T extends unknown = unknown> extends ReadableAtom$<cache_ctx_T<Val>> {
	be:(query_data:query_data_T, opts?:cache_ctx$__be_opts_T)=>cache_ctx_value$_T<Val>;
	ensure:(query_data:query_data_T, opts?:cache_ctx$__be_opts_T)=>Promise<cache_ctx_value$_T<Val>|nullish>;
	ensure_val:(query_data:query_data_T, opts?:cache_ctx$__be_opts_T)=>Promise<Val|nullish>;
	set:(id:string, val:Val)=>void
}
export { cache_ctx$_ as _cache_ctx, }
