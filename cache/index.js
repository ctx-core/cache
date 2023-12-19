/// <reference types="ctx-core" />
/// <reference types="./index.d.ts" />
import { atom_, computed_, readable_fn_ } from '@ctx-core/nanostores'
import { assign } from 'ctx-core/object'
/** @typedef {import('@ctx-core/nanostores').atom_pair_T} */
/** @typedef {import('@ctx-core/nanostores').WritableAtom_} */
/** @typedef {nullish} */
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
	const cache$ = atom_(/** @type {any} */[new Map()])
	const { set } = cache$
	/** @type {ReadableAtom_<Map<*, *>>} */
	const cache_init_ =
		computed_(
			cache$,
			([cache])=>
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
	assign(cache$, ({
		be,
		ensure,
		ensure_val,
		set: set_val,
		subscribe_init,
		to_init
	}))
	return readable_fn_(cache$)
	function set_val(id, val) {
		const cache_val$ = base_be(id)
		cache_val$.set(val)
		set(cache$.get().slice())
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
		const [cache] = cache$.get()
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
		const [cache] = cache$.get()
		const now = new Date()
		const id = params.id ?? id_(query_data)
		const cache_val$ = cache.get(id)
		const { expiration } = cache_val$
		let cache_val = cache_val$.get()
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
				set_val(id, cache_val)
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
		return cache_init_.subscribe(cache_init=>
			listener(/** @type {Map<*, *>} */cache_init))
	}
	/**
	 * @return {cache_init_T<unknown>}
	 */
	function to_init() {
		const [cache] = cache$.get()
		return cache_to_init(cache)
	}
	/**
	 * @param {Map<unknown, unknown>}cache
	 * @return {Map<any, any>}
	 */
	function cache_to_init(cache) {
		const cache_init = new Map()
		for (const [key, val$] of cache) {
			cache_init.set(key, val$.get())
		}
		return cache_init
	}
}
export {
	cache$_ as cache__,
	cache$_ as _cache_ctx,
}
