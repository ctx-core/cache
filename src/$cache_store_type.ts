export interface $cache_store_type<I extends unknown = unknown> {
	data:Record<string, I>
	errors:Record<string, any>
	promises:Record<string, Promise<I>>
}
