export interface $cache_store_type<input_type extends unknown = unknown> {
    data: Record<string, input_type>;
    errors: Record<string, any>;
    promises: Record<string, Promise<input_type>>;
    get: (id: string) => input_type;
}
