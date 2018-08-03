"use strict";

import config from 'exp-config';
import AsyncCache from 'exp-asynccache';
import { initLRUCache } from 'exp-fetch';

const contentCache = new AsyncCache(initLRUCache(config.contentCache));
const postCache = new AsyncCache(initLRUCache(config.contentCache));

const caches = {
    contentCache,
    postCache,
    reset: (done) => {
        contentCache.reset(() => {
            postCache.reset(done);
        });
    }
};

module.exports = caches;
