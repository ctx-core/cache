import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { cache$_ } from '../index.js'
test('be|returns atom_ & triggers loads', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache$.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val$ = cache$.be({ id_prop: 'id1' })
	equal(cache_val$.$, null)
	equal(cache_init_a, [{}])
	await new Promise(res=>queueMicrotask(()=>res(null)))
	await new Promise(res=>queueMicrotask(()=>res(null)))
	equal(cache_val$.$, { $ret: 'query-id1' })
	equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('ensure|async|returns atom_ & loads', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache$.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val$ = await cache$.ensure({ id_prop: 'id1' })
	equal(cache_val$.$, { $ret: 'query-id1' })
	equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('ensure_val|returns loaded val', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache$.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{}])
	const cache_val = await cache$.ensure_val({ id_prop: 'id1' })
	equal(cache_val, { $ret: 'query-id1' })
	equal(cache_init_a, [{}, { id1: { $ret: 'query-id1' } }])
})
test('cache$__opts.cache', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	equal(await cache$.ensure_val({ id_prop: 'id1' }), { $ret: 'init-id1' })
})
test('subscribe_init|subscribe with to_init', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	const cache_init_a:Record<string, { $ret:string }>[] = []
	cache$.subscribe_init(cache_init=>cache_init_a.push(Object.fromEntries(cache_init.entries())))
	equal(cache_init_a, [{ id1: { $ret: 'init-id1' } }])
	equal(await cache$.ensure_val({ id_prop: 'id2' }), { $ret: 'query-id2' })
	equal(cache_init_a, [
		{ id1: { $ret: 'init-id1' } },
		{ id1: { $ret: 'init-id1' }, id2: { $ret: 'query-id2' } }
	])
})
test('to_init', async ()=>{
	const cache$ = cache$_<string, { $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>new Promise(res=>{
			queueMicrotask(()=>res({ $ret: `query-${id_prop}` }))
		}), {
			id_: ({ id_prop })=>id_prop,
			init: Object.entries({ id1: { $ret: 'init-id1' } })
		})
	equal(Object.fromEntries(cache$.to_init().entries()), { id1: { $ret: 'init-id1' } })
})
test.run()
