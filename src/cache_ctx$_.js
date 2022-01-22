import { assign, clone } from '@ctx-core/object'
import { atom$, split_atom$ } from '@ctx-core/nanostores'
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$__query_T}cache_ctx$__query_T */
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$__opts_T}cache_ctx$__opts_T */
/** @typedef {import('./cache_ctx$_.d.ts').cache_ctx$_T}cache_ctx$_T */
/** @typedef {import('@ctx-core/nanostores').split_atom$_ret_T}split_atom$_ret_T */
/** @typedef {import('@ctx-core/nanostores').WritableAtom$}WritableAtom$ */
/** @type {import('@ctx-core/object').nullish}nullish */
/**
 * @param {cache_ctx$__query_T<unknown, cache_ctx$__be_opts_T<unknown>>} query
 * @param {cache_ctx$__opts_T}cache_ctx$__opts
 * @returns {cache_ctx$_T<unknown, unknown>}
 * @private
 */
export function cache_ctx$_(query, cache_ctx$__opts) {
	/** @type {split_atom$_ret_T<unknown>} */
	const cache_ctx$$$ = split_atom$({})
	/** @type {cache_ctx$_T<unknown, unknown>} */
	const cache_ctx$ = cache_ctx$$$[0]
	const set = cache_ctx$$$[1]
	assign(cache_ctx$, ({
		be,
		ensure,
		ensure_val
	}))
	return cache_ctx$
	/**
	 * @param {string} id
	 * @param {cache_ctx$__be_opts_T<unknown>} opts
	 * @returns {cache_ctx_value$_T<unknown>}
	 * @private
	 */
	function be(id, opts) {
		const cache_ctx_value$ = base_be(id)
		load(id, opts).then()
		return cache_ctx_value$
	}
	/**
	 * @param {string} id
	 * @param {cache_ctx$__be_opts_T<unknown>} opts
	 * @returns {Promise<cache_ctx_value$_T<unknown>|nullish>}
	 * @private
	 */
	async function ensure(id, opts) {
		const cache_ctx_value$ = base_be(id)
		await load(id, opts)
		return cache_ctx_value$
	}
	/**
	 * @param {string} id
	 * @param {cache_ctx$__be_opts_T<unknown>} opts
	 * @returns {Promise<unknown|nullish>}
	 * @private
	 */
	async function ensure_val(id, opts) {
		return (await ensure(id, opts)).$
	}
	/**
	 * @param {string} id
	 * @returns {cache_ctx_value$_T<unknown>}
	 */
	function base_be(id) {
		const cache_ctx = cache_ctx$.$
		if (!cache_ctx[id]) {
			cache_ctx[id] = cache_ctx_val_()
			set(cache_ctx)
		}
		return cache_ctx[id]
	}
	/**
	 * @param {string} id
	 * @param {cache_ctx$__be_opts_T<unknown>} opts
	 * @returns {Promise<void>}
	 */
	async function load(id, opts) {
		const cache_ctx = cache_ctx$.$
		const now = new Date()
		const cache_ctx_value$ = cache_ctx[id]
		const { expiration } = cache_ctx_value$
		let cache_ctx_value = cache_ctx_value$.$
		if (cache_ctx_value == null || expiration && expiration < now || opts.force) {
			if (!cache_ctx_value$.promise) {
				cache_ctx_value$.promise = query(id, opts)
			}
			try {
				cache_ctx_value = await cache_ctx_value$.promise
				cache_ctx_value$.set(cache_ctx_value)
				const period = opts?.period || cache_ctx$__opts?.period
				cache_ctx_value$.period = period
				if (period) {
					cache_ctx_value$.expiration = new Date(new Date().getTime() + period)
				}
				const poll = opts?.poll != null ? opts.poll : cache_ctx$__opts?.poll != null ? cache_ctx$__opts?.poll : undefined
				if (poll) {
					cache_ctx_value$.poll = setTimeout(()=>{
						cache_ctx_value$.poll = null
						ensure(id, clone(opts, {
							force: true
						}))
					}, period)
				} else {
					cache_ctx_value$.poll = null
				}
			} catch (e) {
				console.error(e)
				cache_ctx_value$.error = e
				throw e
			}
		}
	}
	/**
	 * @returns {cache_ctx_value$_T<unknown>}
	 * @private
	 */
	function cache_ctx_val_() {
		return atom$(undefined)
	}
}
export { cache_ctx$_ as _cache_ctx, }
