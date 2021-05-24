import { assign, clone } from '@ctx-core/object';
import { _readable_set_ctx$, writable$ } from '@ctx-core/store';
export function _cache_ctx(query, _cache_ctx_opts = {}) {
    const { store: cache_ctx, set } = _readable_set_ctx$({});
    return assign(cache_ctx, {
        be,
        ensure,
    });
    function be(id, opts = {}) {
        const cache_ctx_value = base_be(id);
        load(id, opts).then();
        return cache_ctx_value;
    }
    async function ensure(id, opts = {}) {
        const cache_ctx_value = base_be(id);
        await load(id, opts);
        return cache_ctx_value;
    }
    function base_be(id) {
        const $cache_ctx = cache_ctx.$;
        if (!$cache_ctx[id]) {
            $cache_ctx[id] = _cache_ctx_value();
            set($cache_ctx);
        }
        return $cache_ctx[id];
    }
    async function load(id, opts = {}) {
        const $cache_ctx = cache_ctx.$;
        const now = new Date();
        const cache_ctx_value = $cache_ctx[id];
        const { expiration } = cache_ctx_value;
        let $cache_value = cache_ctx_value.$;
        if ($cache_value == null
            || (expiration && expiration < now)
            || opts.force) {
            if (!cache_ctx_value.promise) {
                cache_ctx_value.promise = query(id, opts);
            }
            try {
                $cache_value = await cache_ctx_value.promise;
                cache_ctx_value.set($cache_value);
                const period = (opts === null || opts === void 0 ? void 0 : opts.period) || _cache_ctx_opts.period;
                cache_ctx_value.period = period;
                if (period) {
                    cache_ctx_value.expiration = new Date(new Date().getTime() + period);
                }
                const poll = (opts === null || opts === void 0 ? void 0 : opts.poll) != null
                    ? opts.poll
                    : _cache_ctx_opts.poll != null
                        ? _cache_ctx_opts.poll
                        : false;
                if (poll) {
                    cache_ctx_value.poll = setTimeout(() => {
                        cache_ctx_value.poll = false;
                        ensure(id, clone(opts, {
                            force: true
                        }));
                    }, period);
                }
                else {
                    cache_ctx_value.poll = false;
                }
            }
            catch (e) {
                console.error(e);
                cache_ctx_value.error = e;
                throw e;
            }
        }
    }
    function _cache_ctx_value() {
        const cache_ctx_value = writable$(null);
        return assign(cache_ctx_value, {});
    }
}
