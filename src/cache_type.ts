export interface cache_type<I extends unknown = unknown> {
	data:Record<string, I>
	errors:Record<string, any>
	promises:Record<string, Promise<I>>
}
