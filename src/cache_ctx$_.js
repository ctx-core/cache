import { assign, clone } from '@ctx-core/object'
import { atom$, split_atom$ } from '@ctx-core/nanostores'
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$__query_T}cache_ctx$__query_T */
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$__opts_T}cache_ctx$__opts_T */
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$_T}cache_ctx$_T */
/** @typedef {import('@ctx-core/nanostores').split_atom$_ret_T}split_atom$_ret_T */
/** @typedef {import('@ctx-core/nanostores').WritableAtom$}WritableAtom$ */
/** @typedef {import('@ctx-core/object').nullish}nullish */
/**
 * @param {cache_ctx$__query_T<unknown, cache_ctx$__be_opts_T>} query
 * @param {cache_ctx$__opts_T}cache_ctx$__opts
 * @returns {cache_ctx$_T<unknown, unknown>}
 * @private
 */
export function cache_ctx$_(query, cache_ctx$__opts = {}) {
	/** @type {split_atom$_ret_T} */
	const cache_ctx$$$ = split_atom$({})
	/** @type {cache_ctx$_T<unknown, unknown>} */
	const cache_ctx$ = cache_ctx$$$[0]
	const set = cache_ctx$$$[1]
	const id_ = cache_ctx$__opts.id_ || (query_data=>query_data.toString())
	assign(cache_ctx$, ({
		be,
		ensure,
		ensure_val
	}))
	return cache_ctx$
	/**
	 * @param {unknown} query_data
	 * @param {cache_ctx$__be_opts_T} opts
	 * @returns {cache_ctx_value$_T}
	 * @private
	 */
	function be(query_data, opts = {}) {
		const cache_ctx_value$ = base_be(opts.id || id_(query_data))
		load(query_data, opts).then()
		return cache_ctx_value$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache_ctx$__be_opts_T} opts
	 * @returns {Promise<cache_ctx_value$_T|nullish>}
	 * @private
	 */
	async function ensure(query_data, opts = {}) {
		const cache_ctx_value$ = base_be(query_data, opts)
		await load(query_data, opts)
		return cache_ctx_value$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache_ctx$__be_opts_T} opts
	 * @returns {Promise<unknown|nullish>}
	 * @private
	 */
	async function ensure_val(query_data, opts = {}) {
		return (await ensure(query_data, opts)).$
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache_ctx$__be_opts_T} opts
	 * @returns {cache_ctx_value$_T}
	 */
	function base_be(query_data, opts = {}) {
		const cache_ctx = cache_ctx$.$
		const id = opts.id || id_(query_data)
		if (!cache_ctx[id]) {
			cache_ctx[id] = cache_ctx_val_()
			set(cache_ctx)
		}
		return cache_ctx[id]
	}
	/**
	 * @param {unknown} query_data
	 * @param {cache_ctx$__be_opts_T} opts
	 * @returns {Promise<void>}
	 */
	async function load(query_data, opts = {}) {
		const cache_ctx = cache_ctx$.$
		const now = new Date()
		const id = opts.id ?? id_(query_data)
		const cache_ctx_value$ = cache_ctx[id]
		const { expiration } = cache_ctx_value$
		let cache_ctx_value = cache_ctx_value$.$
		if (cache_ctx_value == null || expiration && expiration < now || opts.force) {
			if (!cache_ctx_value$.promise) {
				cache_ctx_value$.promise = query(query_data)
			}
			try {
				cache_ctx_value = await cache_ctx_value$.promise
				cache_ctx_value$.set(cache_ctx_value)
				const ttl = opts?.ttl || cache_ctx$__opts?.ttl || opts?.period || cache_ctx$__opts?.period
				if (opts?.period || cache_ctx$__opts?.period) {
					console.warn('cache_ctx$_|period|deprecated|use ttl instead')
				}
				cache_ctx_value$.period = ttl
				if (ttl) {
					cache_ctx_value$.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll = opts?.poll != null ? opts.poll : cache_ctx$__opts?.poll != null ? cache_ctx$__opts?.poll : undefined
				if (poll) {
					cache_ctx_value$.poll = setTimeout(()=>{
						cache_ctx_value$.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, ttl)
				} else {
					cache_ctx_value$.poll = null
				}
			} catch (err) {
				console.error(err)
				cache_ctx_value$.error = err
				throw err
			}
		}
	}
	/**
	 * @returns {cache_ctx_value$_T}
	 * @private
	 */
	function cache_ctx_val_() {
		return atom$(undefined)
	}
}
export { cache_ctx$_ as _cache_ctx, }
