import type { Writable } from '@ctx-core/store'
export interface $cache_store_type<I extends object> {
	data:I
	promise_a1:Promise<I>[]
}
export type cache_store_type<I extends object> = Writable<$cache_store_type<I>>
