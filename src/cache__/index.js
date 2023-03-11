import { atom_, computed_, readable_fn_ } from '@ctx-core/nanostores'
import { assign, clone } from '@ctx-core/object'
/** @typedef {import('@ctx-core/nanostores').split_atom__ret_T}split_atom__ret_T */
/** @typedef {import('@ctx-core/nanostores').WritableAtom_}WritableAtom_ */
/** @typedef {import('@ctx-core/object').nullish}nullish */
/** @typedef {import('./index.d.ts').cache___be_params_T}cache___be_params_T */
/** @typedef {import('./index.d.ts').cache___query_T}cache___query_T */
/** @typedef {import('./index.d.ts').cache___params_T}cache___params_T */
/** @typedef {import('./index.d.ts').cache_T}cache_T */
/** @typedef {import('./index.d.ts').cache__T}cache__T */
/** @typedef {import('./index.d.ts').cache_init_T}cache_init_T */
/** @typedef {import('./index.d.ts').cache_value__T}cache_value__T */
/**
 * @param {cache___query_T<unknown, cache___be_params_T>} query
 * @param {cache___params_T}[cache___params]
 * @returns {ReadableAtom_<unknown>}
 * @private
 */
export function cache__(
	query,
	cache___params = {}
) {
	const cache_ = atom_(/** @type {any} */new Map())
	const { set } = cache_
	/** @type {ReadableAtom_<Map<*, *>>} */
	const cache_init_ =
		computed_(
			cache_,
			cache=>
				cache_to_init(cache))
	if (cache___params.init) {
		const init_aa =
			typeof cache___params.init === 'function'
			? cache___params.init()
			: cache___params.init
		for (const [init_id, init_val] of init_aa) {
			set_val(init_id, init_val)
		}
	}
	const id_ =
		cache___params.id_
		|| (query_data=>query_data)
	/** @type {cache__T} */
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
	 * @param {unknown}query_data
	 * @param {cache___be_params_T}[params]
	 * @returns {cache_value__T}
	 * @private
	 */
	function be(query_data, params = {}) {
		const cache_val_ = base_be(params.id || id_(query_data))
		load(query_data, params).then()
		return cache_val_
	}
	/**
	 * @param {unknown}query_data
	 * @param {cache___be_params_T}[params]
	 * @returns {Promise<cache_value__T|nullish>}
	 * @private
	 */
	async function ensure(query_data, params = {}) {
		const cache_val_ = base_be(params.id || id_(query_data))
		await load(query_data, params)
		return cache_val_
	}
	/**
	 * @param {unknown}query_data
	 * @param {cache___be_params_T}[params]
	 * @returns {Promise<unknown|nullish>}
	 * @private
	 */
	async function ensure_val(query_data, params = {}) {
		return (await ensure(query_data, params)).get()
	}
	/**
	 * @param {string}id
	 * @returns {cache_value__T}
	 */
	function base_be(id) {
		const cache = cache_.get()
		if (!cache.get(id)) {
			cache.set(id, atom_(undefined))
		}
		return cache.get(id)
	}
	/**
	 * @param {unknown}query_data
	 * @param {cache___be_params_T}[params]
	 * @returns {Promise<void>}
	 */
	async function load(query_data, params = {}) {
		const cache = cache_.get()
		const now = new Date()
		const id = params.id ?? id_(query_data)
		const cache_val_ = cache.get(id)
		const { expiration } = cache_val_
		let cache_val = cache_val_.get()
		if (cache_val === undefined || (expiration && expiration < now) || params.force) {
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
				const ttl =
					params?.ttl
					|| cache___params?.ttl
					|| params?.period
					|| cache___params?.period
				if (params?.period || cache___params?.period) {
					console.warn('cache__|period|deprecated|use ttl instead')
					cache_val_.period = ttl
				}
				if (ttl) {
					cache_val_.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll =
					params?.poll != null
					? params.poll
					: cache___params?.poll != null
						? cache___params?.poll
						: undefined
				if (poll) {
					cache_val_.poll = setTimeout(()=>{
						cache_val_.poll = null
						ensure(id, clone(params, {
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
		return cache_init_.subscribe(cache_init=>
			listener(/** @type {Map<*, *>} */cache_init))
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
