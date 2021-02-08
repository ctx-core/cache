import type { Writable } from '@ctx-core/store'
export interface $cache_store_type<I extends unknown = unknown> {
	data:I
	promise_a1:Promise<I>[]
}
export interface cache_store_type<I extends unknown = unknown> extends Writable<$cache_store_type<I>> {}
