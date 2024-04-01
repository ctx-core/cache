import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { cache$__new } from '../index.js'
test('be|returns atom_ & triggers loads', async ()=>{
	const cache$ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache$.subscribe_init(cache_init=>
		cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val_ = cache$.be({ id_prop: 'id1' })
	equal(cache_val_(), undefined)
	equal(cache_init_a, [{}])
	await finishMicrotask()
	await finishMicrotask()
	equal(cache_val_(), { $ret: 'query-id1' })
	// equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('ensure|async|returns atom_ & loads', async ()=>{
	const cache_ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache_.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val_ = await cache_.ensure({ id_prop: 'id1' })
	equal(cache_val_(), { $ret: 'query-id1' })
	equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('load|through|be,ensure|query returns null|caches the null value', async ()=>{
	const query_args:unknown[][] = []
	const cache_ = cache$__new<string, null, { id_prop:string }>(
		({ id_prop })=>new Promise(res=>{
			query_args.push([{ id_prop }])
			queueMicrotask(()=>res(null))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const id_prop = 'test'
	equal(query_args, [])
	await cache_.ensure({ id_prop })
	equal(query_args, [[{ id_prop }]])
	await cache_.ensure({ id_prop })
	equal(query_args, [[{ id_prop }]])
})
test('ensure_val|returns loaded val', async ()=>{
	const cache_ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache_.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val = await cache_.ensure_val({ id_prop: 'id1' })
	equal(cache_val, { $ret: 'query-id1' })
	equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('cache___opts.cache', async ()=>{
	const cache_ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	equal(await cache_.ensure_val({ id_prop: 'id1' }), { $ret: 'init-id1' })
})
test('subscribe_init|subscribe with to_init', async ()=>{
	const cache_ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache_.subscribe_init(cache_init=>
		cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{ id1: { $ret: 'init-id1' } }])
	equal(await cache_.ensure_val({ id_prop: 'id2' }), { $ret: 'query-id2' })
	equal(cache_init_a, [
		{ id1: { $ret: 'init-id1' } },
		{ id1: { $ret: 'init-id1' }, id2: { $ret: 'query-id2' } }
	])
})
test('to_init', async ()=>{
	const cache_ = cache$__new<string, { $ret:string }, { id_prop:string }>(
		({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	equal(Object.fromEntries(cache_.to_init().entries()), { id1: { $ret: 'init-id1' } })
})
test.run()
function finishMicrotask() {
	return new Promise(res=>
		queueMicrotask(()=>res(null)))
}
