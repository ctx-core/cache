import { _atom_, _computed_, atom_, readable_fn_ } from '@ctx-core/nanostores'
import { assign, clone } from '@ctx-core/object'
/** @typedef {import('./index.d.ts').cache$__query_T}cache$__query_T */
/** @typedef {import('./index.d.ts').cache$__opts_T}cache$__opts_T */
/** @typedef {import('./index.d.ts').cache_T}cache_T */
/** @typedef {import('./index.d.ts').cache$_T}cache$_T */
/** @typedef {import('./index.d.ts').cache_init_T}cache_init_T */
/** @typedef {import('./index.d.ts').cache_val$_T}cache_val$_T */
/** @typedef {import('@ctx-core/nanostores').split_atom__ret_T}split_atom__ret_T */
/** @typedef {import('@ctx-core/nanostores').WritableAtom_}WritableAtom_ */
/** @typedef {import('@ctx-core/object').nullish}nullish */
/**
 * @param {cache$__query_T<unknown, cache$__be_opts_T>} query
 * @param {cache$__opts_T}cache___opts
 * @returns {ReadableAtom_<unknown>}
 * @private
 */
export function cache__(query, cache___opts = {}) {
	const cache_ = _atom_(new Map())
	const { set } = cache_
	/** @type {ReadableAtom_<Map<*, *>>} */
	const cache_init_ = _computed_(cache_, cache=>cache_to_init(cache))
	if (cache___opts.init) {
		const init_aa = typeof cache___opts.init === 'function' ? cache___opts.init() : cache___opts.init
		for (const [init_id, init_val] of init_aa) {
			set_val(init_id, init_val)
		}
	}
	const id_ = cache___opts.id_ || (query_data=>query_data)
	assign(cache_, ({
		be,
		ensure,
		ensure_val,
		set: set_val,
		subscribe_init,
		to_init
	}))
	return readable_fn_(cache_)
	function set_val(id, val) {
		const cache_val_ = base_be(id)
		cache_val_.set(val)
		set(cache_.get())
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {cache_val$_T}
	 * @private
	 */
	function be(query_data, opts = {}) {
		const cache_val_ = base_be(opts.id || id_(query_data))
		load(query_data, opts).then()
		return cache_val_
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<cache_val$_T|nullish>}
	 * @private
	 */
	async function ensure(query_data, opts = {}) {
		const cache_val_ = base_be(opts.id || id_(query_data))
		await load(query_data, opts)
		return cache_val_
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<unknown|nullish>}
	 * @private
	 */
	async function ensure_val(query_data, opts = {}) {
		return (await ensure(query_data, opts)).get()
	}
	/**
	 * @param {string} id
	 * @returns {cache_val$_T}
	 */
	function base_be(id) {
		const cache = cache_.get()
		if (!cache.get(id)) {
			cache.set(id, atom_(null))
		}
		return cache.get(id)
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<void>}
	 */
	async function load(query_data, opts = {}) {
		const cache = cache_.get()
		const now = new Date()
		const id = opts.id ?? id_(query_data)
		const cache_val_ = cache.get(id)
		const { expiration } = cache_val_
		let cache_val = cache_val_.get()
		if (cache_val == null || (expiration && expiration < now) || opts.force) {
			if (cache_val_.promise_rc == null) {
				cache_val_.promise_rc = 0
			}
			if (!cache_val_.promise) {
				cache_val_.promise = query(query_data)
			}
			try {
				cache_val_.promise_rc++
				cache_val = await cache_val_.promise
				cache_val_.promise_rc--
				if (!cache_val_.promise_rc) cache_val_.promise = null
				set_val(id, cache_val)
				const ttl = opts?.ttl || cache___opts?.ttl || opts?.period || cache___opts?.period
				if (opts?.period || cache___opts?.period) {
					console.warn('cache__|period|deprecated|use ttl instead')
					cache_val_.period = ttl
				}
				if (ttl) {
					cache_val_.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll = opts?.poll != null ? opts.poll : cache___opts?.poll != null ? cache___opts?.poll : undefined
				if (poll) {
					cache_val_.poll = setTimeout(()=>{
						cache_val_.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, ttl)
				} else {
					cache_val_.poll = null
				}
			} catch (err) {
				console.error(err)
				cache_val_.error = err
				throw err
			}
		}
	}
	/**
	 * @param {(value:cache_init_T<unknown>)=>void}listener
	 * @return {() => void}
	 */
	function subscribe_init(listener) {
		return cache_init_.subscribe(cache_init=>listener(cache_init))
	}
	/**
	 * @return {cache_init_T<unknown>}
	 */
	function to_init() {
		const cache = cache_.get()
		return cache_to_init(cache)
	}
	/**
	 * @param {Map<unknown, unknown>}cache
	 * @return {Map<any, any>}
	 */
	function cache_to_init(cache) {
		const cache_init = new Map()
		for (const [key, val_] of cache) {
			cache_init.set(key, val_.get())
		}
		return cache_init
	}
}
export {
	cache__ as cache$_,
	cache__ as _cache_ctx,
}
