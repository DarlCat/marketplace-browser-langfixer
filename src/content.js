
console.log("Second Life Marketplace Lang Helper extension active.");

(function() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (!browserLang) return;

    /**
     * Extracts the locale string from a given URL path.
     *
     * @param {string} path - The URL path to extract the locale from (e.g., "/en-US/page").
     * @returns {string|null} The extracted locale (e.g., "en-US") if present, otherwise null.
     */
    function getLocaleFromPath(path) {
        const match = path.match(/^\/(\w{2}-\w{2})\//);
        return match ? match[1] : null;
    }

    /**
     * Replaces the locale segment in a given URL path with a new locale.
     * If the path does not contain a locale, prepends the new locale to the path.
     *
     * @param {string} path - The original URL path, possibly containing a locale segment (e.g., "/en-US/some/path").
     * @param {string} newLocale - The new locale to insert into the path (e.g., "fr-FR").
     * @returns {string} The updated path with the new locale.
     */
    function replaceLocaleInPath(path, newLocale) {
        if (getLocaleFromPath(path)) {
            return path.replace(/^\/(\w{2}-\w{2})\//, `/${newLocale}/`);
        } else {
            return `/${newLocale}${path.startsWith('/') ? '' : '/'}${path}`;
        }
    }

    const url = new URL(window.location.href);
    const currentLocale = getLocaleFromPath(url.pathname);
    const queryLocale = url.searchParams.get('lang');

    if ((currentLocale && currentLocale.toLowerCase() !== browserLang.toLowerCase()) ||
        (queryLocale && queryLocale.toLowerCase() !== browserLang.toLowerCase())) {
        let newPath = replaceLocaleInPath(url.pathname, browserLang);
        if (queryLocale) {
            url.searchParams.set('lang', browserLang);
        }
        const newUrl = `${url.origin}${newPath}${url.search}`;
        if (window.location.href !== newUrl) {
            window.location.replace(newUrl);
        }
    }
})();
