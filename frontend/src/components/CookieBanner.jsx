import { useState } from "react";
import PropTypes from "prop-types";
import { saveCookieConsent } from "../services/cookieService";

export default function CookieBanner({ onAccept }) {
    const [showSettings, setShowSettings] = useState(false);

    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false
    });

    const handleAcceptAll = () => {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };

        saveCookieConsent(consent);
        onAccept();
    };

    const handleRejectAll = () => {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };

        saveCookieConsent(consent);
        onAccept();
    };

    const handleSavePreferences = () => {
        const consent = {
            ...preferences,
            timestamp: new Date().toISOString()
        };

        saveCookieConsent(consent);
        onAccept();
    };

    return (
        <div className="cookie-overlay">
            <div className="cookie-banner">
                <h3>Cookie Preferences</h3>

                <p>
                    This website uses cookies to ensure proper functionality and to improve
                    your experience. You can choose which categories you allow.
                </p>

                {showSettings && (
                    <div className="cookie-settings">
                        <label>
                            <input type="checkbox" checked disabled />
                            Necessary cookies (required)
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={preferences.analytics}
                                onChange={(e) =>
                                    setPreferences({
                                        ...preferences,
                                        analytics: e.target.checked
                                    })
                                }
                            />
                            Analytics cookies
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={preferences.marketing}
                                onChange={(e) =>
                                    setPreferences({
                                        ...preferences,
                                        marketing: e.target.checked
                                    })
                                }
                            />
                            Marketing cookies
                        </label>
                    </div>
                )}

                <div className="cookie-actions">
                    <button onClick={handleAcceptAll}>Accept all</button>
                    <button onClick={handleRejectAll} className="secondary">
                        Reject all
                    </button>
                    <button onClick={() => setShowSettings(!showSettings)}>
                        Customize
                    </button>

                    {showSettings && (
                        <button onClick={handleSavePreferences} className="primary">
                            Save preferences
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

CookieBanner.propTypes = {
    onAccept: PropTypes.func.isRequired
};