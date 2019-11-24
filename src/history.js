import { createBrowserHistory } from "history";

function LanguageAwareHistory(history) {
    const getLangPrefix = () => {
        const [, prefix] = /^(\/[a-z]{2})\/?/.exec(history.location.pathname) || ['', ''];
        return prefix;
    };

    const applyLangPrefix = (origPath) => {
        const prefix = getLangPrefix();
        if (typeof origPath === 'object') {
            let { pathname } = origPath;
            if (pathname && pathname.slice(0, 1) === '/') {
                pathname = `${prefix}${pathname}`;
            }
            return { ...origPath, pathname };
        }
        let pathname = origPath;
        if (pathname && pathname.slice(0, 1) === '/') {
            pathname = `${prefix}${pathname}`;
        }
        return pathname;
    };

    // this history will restore lang prefix in the URL during SPA navigation
    // and href generation for anchor in `Link` component
    this.push = (origPath, state) => {
        const path = applyLangPrefix(origPath);
        return history.push(path, state);
    };

    this.replace = (origPath, state) => {
        const path = applyLangPrefix(origPath);
        return history.replace(path, state);
    };

    this.createHref = (href) => {
        const prefix = getLangPrefix();
        return history.createHref({ ...href, pathname: `${prefix}${href.pathname}` });
    };
}

export function createHistory() {
    const browserHistory = createBrowserHistory();

    LanguageAwareHistory.prototype = browserHistory;
    LanguageAwareHistory.prototype.constructor = LanguageAwareHistory;

    return new LanguageAwareHistory(browserHistory);
}
