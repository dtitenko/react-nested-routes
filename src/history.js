import { createBrowserHistory } from "history";

export function createHistory() {
    const browserHistory = createBrowserHistory();

    const getLangPrefix = () => {
        const [, prefix] = /^(\/[a-z]{2})\/?/.exec(browserHistory.location.pathname) || ['', ''];
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
    const history = {
        ...browserHistory,
        get length() { return browserHistory.length; },
        get action() { return browserHistory.action; },
        get location() { return browserHistory.location; },
        createHref: (href) => {
            const prefix = getLangPrefix();
            return browserHistory.createHref({ ...href, pathname: `${prefix}${href.pathname}` });
        },
        push: (origPath, state) => {
            const path = applyLangPrefix(origPath);
            return browserHistory.push(path, state);
        },
        replace: (origPath, state) => {
            const path = applyLangPrefix(origPath);
            return browserHistory.replace(path, state);
        }
    };

    return history;
}