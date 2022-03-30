import { assign, clone } from '@ctx-core/object'
import { atom$, split_atom$ } from '@ctx-core/nanostores'
/** @typedef {import('./cache$_.d.ts').cache$__query_T}cache$__query_T */
/** @typedef {import('./cache$_.d.ts').cache$__opts_T}cache$__opts_T */
/** @typedef {import('./cache$_.d.ts').cache$_T}cache$_T */
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
	/** @type {split_atom$_ret_T} */
	const cache$$$ = split_atom$({})
	/** @type {cache$_T<unknown, unknown>} */
	const cache$ = cache$$$[0]
	const set = cache$$$[1]
	const id_ = cache$__opts.id_ || (query_data=>query_data.toString())
	assign(cache$, ({
		be,
		ensure,
		ensure_val,
		set: (id, val)=>{
			const cache_value$ = base_be(id)
			cache_value$.$ = val
		}
	}))
	return cache$
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {cache_value$_T}
	 * @private
	 */
	function be(query_data, opts = {}) {
		const cache_value$ = base_be(opts.id || id_(query_data))
		load(query_data, opts).then()
		return cache_value$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {Promise<cache_value$_T|nullish>}
	 * @private
	 */
	async function ensure(query_data, opts = {}) {
		const cache_value$ = base_be(opts.id || id_(query_data))
		await load(query_data, opts)
		return cache_value$
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
	 * @param {unknown} query_data
	 * @param {cache$__be_opts_T} opts
	 * @returns {cache_value$_T}
	 */
	function base_be(id) {
		const cache = cache$.$
		if (!cache[id]) {
			cache[id] = cache_val_()
			set(cache)
		}
		return cache[id]
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
		const cache_value$ = cache[id]
		const { expiration } = cache_value$
		let cache_value = cache_value$.$
		if (cache_value == null || (expiration && expiration < now) || opts.force) {
			if (cache_value$.promise_rc == null) {
				cache_value$.promise_rc = 0
			}
			if (!cache_value$.promise) {
				cache_value$.promise = query(query_data)
			}
			try {
				cache_value$.promise_rc++
				cache_value = await cache_value$.promise
				cache_value$.promise_rc--
				if (!cache_value$.promise_rc) cache_value$.promise = null
				cache_value$.$ = cache_value
				const ttl = opts?.ttl || cache$__opts?.ttl || opts?.period || cache$__opts?.period
				if (opts?.period || cache$__opts?.period) {
					console.warn('cache$_|period|deprecated|use ttl instead')
					cache_value$.period = ttl
				}
				if (ttl) {
					cache_value$.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll = opts?.poll != null ? opts.poll : cache$__opts?.poll != null ? cache$__opts?.poll : undefined
				if (poll) {
					cache_value$.poll = setTimeout(()=>{
						cache_value$.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, ttl)
				} else {
					cache_value$.poll = null
				}
			} catch (err) {
				console.error(err)
				cache_value$.error = err
				throw err
			}
		}
	}
	/**
	 * @returns {cache_value$_T}
	 * @private
	 */
	function cache_val_() {
		return atom$(undefined)
	}
}
export { cache$_ as _cache_ctx, }
