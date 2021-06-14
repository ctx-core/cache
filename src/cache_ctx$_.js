import { assign, clone } from '@ctx-core/object';
import { readable$_set_ctx_, writable$ } from '@ctx-core/store';
export function cache_ctx$_(query, cache_ctx$__opts = {}) {
    const { store: cache_ctx$, set } = readable$_set_ctx_({});
    return assign(cache_ctx$, {
        be,
        ensure,
        ensure_val,
    });
    function be(id, opts = {}) {
        const cache_ctx_value$ = base_be(id);
        load(id, opts).then();
        return cache_ctx_value$;
    }
    async function ensure(id, opts = {}) {
        const cache_ctx_value$ = base_be(id);
        await load(id, opts);
        return cache_ctx_value$;
    }
    async function ensure_val(id, opts = {}) {
        return (await ensure(id, opts))._;
    }
    function base_be(id) {
        const cache_ctx = cache_ctx$._;
        if (!cache_ctx[id]) {
            cache_ctx[id] = cache_ctx_val_();
            set(cache_ctx);
        }
        return cache_ctx[id];
    }
    async function load(id, opts = {}) {
        const cache_ctx = cache_ctx$._;
        const now = new Date();
        const cache_ctx_value$ = cache_ctx[id];
        const { expiration } = cache_ctx_value$;
        let cache_ctx_value = cache_ctx_value$._;
        if (cache_ctx_value == null
            || (expiration && expiration < now)
            || opts.force) {
            if (!cache_ctx_value$.promise) {
                cache_ctx_value$.promise = query(id, opts);
            }
            try {
                cache_ctx_value = await cache_ctx_value$.promise;
                cache_ctx_value$.set(cache_ctx_value);
                const period = (opts === null || opts === void 0 ? void 0 : opts.period) || cache_ctx$__opts.period;
                cache_ctx_value$.period = period;
                if (period) {
                    cache_ctx_value$.expiration = new Date(new Date().getTime() + period);
                }
                const poll = (opts === null || opts === void 0 ? void 0 : opts.poll) != null
                    ? opts.poll
                    : cache_ctx$__opts.poll != null
                        ? cache_ctx$__opts.poll
                        : undefined;
                if (poll) {
                    cache_ctx_value$.poll = setTimeout(() => {
                        cache_ctx_value$.poll = null;
                        ensure(id, clone(opts, {
                            force: true
                        }));
                    }, period);
                }
                else {
                    cache_ctx_value$.poll = null;
                }
            }
            catch (e) {
                console.error(e);
                cache_ctx_value$.error = e;
                throw e;
            }
        }
    }
    function cache_ctx_val_() {
        return writable$(undefined);
    }
}
export { cache_ctx$_ as _cache_ctx, };
//# sourceMappingURL=src/cache_ctx$_.js.map