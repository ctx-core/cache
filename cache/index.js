/// <reference types="ctx-core" />
/// <reference types="./index.d.ts" />
import { memo_, rmemo__add, sig_ } from 'ctx-core/rmemo'
/**
 * @param {cache___query_T<unknown, cache___be_params_T>} query
 * @param {cache___params_T}[cache___params]
 * @returns {ReadableAtom_<unknown>}
 * @private
 */
export function cache$_(
	query,
	cache___params = {}
) {
	const cache$ = sig_(/** @type {any} */[new Map()])
	/** @type {ReadableAtom_<Map<*, *>>} */
	const cache_init_ =
		memo_(
			cache$,
			[
				cache$=>
					memo_(()=>cache_to_init(cache$()[0]))
			])
	cache_init_()
	if (cache___params.init) {
		const init_aa =
			typeof cache___params.init === 'function'
				? cache___params.init()
				: cache___params.init
		for (const [init_id, init_val] of init_aa) {
			val__set(init_id, init_val)
		}
	}
	const id_ =
		cache___params.id_
		|| (query_data=>query_data)
	/** @type {cache__T} */
	cache$.be = be
	cache$.ensure = ensure
	cache$.ensure_val = ensure_val
	cache$.subscribe_init = subscribe_init
	cache$.to_init = to_init
	return cache$
	function val__set(id, val) {
		const cache_val$ = base_be(id)
		cache_val$._ = val
		cache$._ = cache$().slice()
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
		return (await ensure(query_data, params))()
	}
	/**
	 * @param {string}id
	 * @returns {cache_value__T}
	 */
	function base_be(id) {
		const [cache] = cache$()
		if (!cache.get(id)) {
			cache.set(id, sig_(undefined))
		}
		return cache.get(id)
	}
	/**
	 * @param {unknown}query_data
	 * @param {cache___be_params_T}[params]
	 * @returns {Promise<void>}
	 */
	async function load(query_data, params = {}) {
		const [cache] = cache$()
		const now = new Date()
		const id = params.id ?? id_(query_data)
		const cache_val$ = cache.get(id)
		const { expiration } = cache_val$
		let cache_val = cache_val$()
		if (cache_val === undefined || (expiration && expiration < now) || params.force) {
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
				val__set(id, cache_val)
				const ttl =
					params?.ttl
					|| cache___params?.ttl
					|| params?.period
					|| cache___params?.period
				if (params?.period || cache___params?.period) {
					console.warn('cache$_|period|deprecated|use ttl instead')
					cache_val$.period = ttl
				}
				if (ttl) {
					cache_val$.expiration = new Date(new Date().getTime() + ttl)
				}
				const poll =
					params?.poll != null
						? params.poll
						: cache___params?.poll != null
							? cache___params?.poll
							: undefined
				if (poll) {
					cache_val$.poll = setTimeout(()=>{
						cache_val$.poll = null
						ensure(id, { ...params, force: true })
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
		return rmemo__add(
			cache_init_,
			()=>
				memo_(()=>listener(cache_to_init(cache$()[0]))))
	}
	/**
	 * @return {cache_init_T<unknown>}
	 */
	function to_init() {
		const [cache] = cache$()
		return cache_to_init(cache)
	}
	/**
	 * @param {Map<unknown, unknown>}cache
	 * @return {Map<any, any>}
	 */
	function cache_to_init(cache) {
		const cache_init = new Map()
		for (const [key, val$] of cache.entries()) {
			cache_init.set(key, val$())
		}
		return cache_init
	}
}
export {
	cache$_ as cache__,
	cache$_ as _cache_ctx,
}
