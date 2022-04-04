import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { cache$_ } from '../index.js'
test('cache$__opts.cache', async ()=>{
	const cache$ = cache$_<{ $ret:string }, { id_prop:string }>(
		async ({ id_prop }:{ id_prop:string })=>{
			return { $ret: `query-${id_prop}` }
		}, {
			id_: ({ id_prop })=>id_prop,
			init: { id1: { $ret: 'init-id1' } }
		})
	equal(await cache$.ensure_val({ id_prop: 'id1' }), { $ret: 'init-id1' })
})
test.run()
