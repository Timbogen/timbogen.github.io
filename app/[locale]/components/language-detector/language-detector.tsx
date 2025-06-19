"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, defaultLocale } from "@/i18n/config";
import { createLocalizedUrl, preferredLocaleKey } from "@/app/utils/i18n-utils";
import { useLocale } from "next-intl";

/**
 * Looks for the preferred locale setting
 */
export const detectPreferredLocale = () => {
    const savedLocale = localStorage.getItem(preferredLocaleKey);
    if (savedLocale && locales.includes(savedLocale)) return savedLocale;
    const browserLanguages = navigator.languages || [navigator.language];
    const browserLocale = browserLanguages.map((lang) => lang.split("-")[0]).find((lang) => locales.includes(lang));
    if (browserLocale && locales.includes(browserLocale)) return browserLocale;
    return defaultLocale;
};

/**
 * Component that detects the user's preferred language and redirects accordingly
 * This component doesn't render anything visible, it just performs the detection and redirection
 */
export const LanguageDetector: React.FC = () => {
    const locale = useLocale();
    const router = useRouter();

    /** Load the language settings */
    useEffect(() => {
        // Only run on the client side
        if (typeof window === "undefined") return;

        // If the current path doesn't have a valid locale, we might be at the root
        if (!locales.includes(locale)) {
            // We're probably at the root or an invalid path, don't do anything
            return;
        }

        // Check the preferred setting
        const preferredLocale = detectPreferredLocale();
        if (preferredLocale !== locale) {
            const newUrl = createLocalizedUrl(preferredLocale);
            router.replace(newUrl, { scroll: false });
        }
    }, [router, locale]);

    return null;
};
