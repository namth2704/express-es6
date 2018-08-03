"use strict";

import buildFetch from 'exp-fetch';
import logger from './logger';
import caches from './caches';
import formatUrl from './formatUrl';

const fetchBuilder = buildFetch({
    logger: logger,
    cache: caches.contentCache,
    cacheKeyFn: formatUrl,
    clone: false,
    freeze: false,
    deepFreeze: false,
    followRedirect: false
});

const fetch = fetchBuilder.fetch;

module.exports = fetch;
