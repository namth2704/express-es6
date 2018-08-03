"use strict";

import url from 'url';

const formatUrl = (urlString) => {
    if (typeof urlString !== "string") return urlString;

    const path = url.parse(urlString);
    return removeTrailingSlash(path.pathname) + (path.search || "");
}

const removeTrailingSlash = (pathName) => {
    if (pathName === "/") return pathName;
    if (pathName.toLowerCase() === "/resolveurl/") return pathName;

    return pathName.replace(/\/$/, "");
}

export default formatUrl;