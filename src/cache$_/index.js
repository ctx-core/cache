import { atom$, computed$, split_atom$ } from '@ctx-core/nanostores'
import { assign, clone } from '@ctx-core/object'
/** @typedef {import('./index.d.ts').cache$__query_T}cache$__query_T */
/** @typedef {import('./index.d.ts').cache$__opts_T}cache$__opts_T */
/** @typedef {import('./index.d.ts').cache_T}cache_T */
/** @typedef {import('./index.d.ts').cache$_T}cache$_T */
/** @typedef {import('./index.d.ts').cache_init_T}cache_init_T */
/** @typedef {import('./index.d.ts').cache_val$_T}cache_val$_T */
/** @typedef {import('@ctx-core/nanostores').split_atom$_ret_T}split_atom$_ret_T */
/** @typedef {import('@ctx-core/nanostores').WritableAtom$}WritableAtom$ */
/** @typedef {import('@ctx-core/object').nullish}nullish */
/**
 * @param {cache$__query_T<unknown, cache$__be_opts_T>} query
 * @param {cache$__opts_T}cache$__opts
 * @returns {cache$_T<unknown, unknown>}
 * @private
 */
export function cache$_(query, cache$__opts = {}) {
	/** @type {split_atom$_ret_T<cache$_T<unknown, unknown>>} */
	const cache$$$ = split_atom$(new Map())
	/** @type {cache$_T<unknown, unknown>} */
	const cache$ = cache$$$[0]
	const set = cache$$$[1]
	const cache_init$ = computed$(cache$, cache=>cache_to_init(cache))
	if (cache$__opts.init) {
		const init_aa = typeof cache$__opts.init === 'function' ? cache$__opts.init() : cache$__opts.init
		for (const [init_id, init_val] of init_aa) {
			set_val(init_id, init_val)
		}
	}
	const id_ = cache$__opts.id_ || (query_data=>query_data)
	assign(cache$, ({
		be,
		ensure,
		ensure_val,
		set: set_val,
		subscribe_init,
		to_init
	}))
	return cache$
	function set_val(id, val) {
		const cache_val$ = base_be(id)
		cache_val$.$ = val
		set(cache$.$)
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {cache_val$_T}
	 * @private
	 */
	function be(query_data, opts = {}) {
		const cache_val$ = base_be(opts.id || id_(query_data))
		load(query_data, opts).then()
		return cache_val$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<cache_val$_T|nullish>}
	 * @private
	 */
	async function ensure(query_data, opts = {}) {
		const cache_val$ = base_be(opts.id || id_(query_data))
		await load(query_data, opts)
		return cache_val$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<unknown|nullish>}
	 * @private
	 */
	async function ensure_val(query_data, opts = {}) {
		return (await ensure(query_data, opts)).$
	}
	/**
	 * @param {string} id
	 * @returns {cache_val$_T}
	 */
	function base_be(id) {
		const cache = cache$.$
		if (!cache.get(id)) {
			cache.set(id, atom$(null))
		}
		return cache.get(id)
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<void>}
	 */
	async function load(query_data, opts = {}) {
		const cache = cache$.$
		const now = new Date()
		const id = opts.id ?? id_(query_data)
		const cache_val$ = cache.get(id)
		const { expiration } = cache_val$
		let cache_val = cache_val$.$
		if (cache_val == null || (expiration && expiration < now) || opts.force) {
			if (cache_val$.promise_rc == null) {
				cache_val$.promise_rc = 0
			}
			if (!cache_val$.promise) {
				cache_val$.promise = query(query_data)
			}
			try {
				cache_val$.promise_rc++
				cache_val = await cache_val$.promise
				cache_val$.promise_rc--
				if (!cache_val$.promise_rc) cache_val$.promise = null
				set_val(id, cache_val)
				const ttl = opts?.ttl || cache$__opts?.ttl || opts?.period || cache$__opts?.period
				if (opts?.period || cache$__opts?.period) {
					console.warn('cache$_|period|deprecated|use ttl instead')
					cache_val$.period = ttl
				}
				if (ttl) {
					cache_val$.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll = opts?.poll != null ? opts.poll : cache$__opts?.poll != null ? cache$__opts?.poll : undefined
				if (poll) {
					cache_val$.poll = setTimeout(()=>{
						cache_val$.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, ttl)
				} else {
					cache_val$.poll = null
				}
			} catch (err) {
				console.error(err)
				cache_val$.error = err
				throw err
			}
		}
	}
	/**
	 * @param {(value:cache_init_T<unknown>)=>void}listener
	 * @return {() => void}
	 */
	function subscribe_init(listener) {
		return cache_init$.subscribe(cache_init=>listener(cache_init))
	}
	/**
	 * @return {cache_init_T<unknown>}
	 */
	function to_init() {
		const cache = cache$.$
		return cache_to_init(cache)
	}
	/**
	 * @param {Map<unknown, unknown>}cache
	 * @return {Map<any, any>}
	 */
	function cache_to_init(cache) {
		const cache_init = new Map()
		for (const [key, val$] of cache) {
			cache_init.set(key, val$.$)
		}
		return cache_init
	}
}
export { cache$_ as _cache_ctx, }
