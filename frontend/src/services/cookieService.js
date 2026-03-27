const COOKIE_KEY = "graphoria_cookie_consent";

export function getCookieConsent() {
    const data = localStorage.getItem(COOKIE_KEY);
    return data ? JSON.parse(data) : null;
}

export function saveCookieConsent(consent) {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
}

export function hasUserConsented() {
    return !!getCookieConsent();
}