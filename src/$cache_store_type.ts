export interface $cache_store_type<input_type extends unknown = unknown> {
	data:Record<string, input_type>
	errors:Record<string, $error_type>
	promises:Record<string, Promise<input_type>>
	get:(id:string)=>input_type
}
export type $error_type = any