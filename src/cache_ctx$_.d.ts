import type { nullish, Timeout } from '@ctx-core/function'
import { ReadableAtom$, WritableAtom$ } from '@ctx-core/nanostores'
export declare function cache_ctx$_<Val extends unknown = unknown, opts_data_T extends unknown = unknown>(
	query:cache_ctx$__query_T<Val, cache_ctx$__be_opts_T<opts_data_T>>,
	cache_ctx$__opts?:cache_ctx$__opts_T
):cache_ctx$_T<Val, opts_data_T>;
export interface cache_ctx$__opts_T {
	ttl?:number;
	period?:number;
	poll?:boolean;
}
export declare type cache_ctx$__query_T<Val extends unknown = unknown, opts_data_T extends unknown = unknown> =
	(id:string, opts_data?:opts_data_T)=>Promise<Val>;
export interface cache_ctx$__be_opts_T<opts_data_T extends unknown = unknown> extends cache_ctx$__opts_T {
	data?:opts_data_T;
	ttl?:number;
	period?:number;
	poll?:boolean;
	force?:boolean;
}
export interface cache_ctx_value$_T<Val extends unknown = unknown> extends WritableAtom$<Val|nullish> {
	promise?:Promise<Val>;
	error?:any;
	ttl?:number;
	period?:number;
	poll?:number|Timeout|nullish;
	expiration?:Date;
}
export declare type cache_ctx_T<Val extends unknown = unknown> = Record<string, cache_ctx_value$_T<Val>>;
export interface cache_ctx$_T<Val extends unknown = unknown, opts_data_T extends unknown = unknown> extends ReadableAtom$<cache_ctx_T<Val>> {
	be:(id:string, opts:cache_ctx$__be_opts_T<opts_data_T>)=>cache_ctx_value$_T<Val>;
	ensure:(id:string, opts:cache_ctx$__be_opts_T<opts_data_T>)=>Promise<cache_ctx_value$_T<Val>|nullish>;
	ensure_val:(id:string, opts:cache_ctx$__be_opts_T<opts_data_T>)=>Promise<Val|nullish>;
}
export { cache_ctx$_ as _cache_ctx, }
