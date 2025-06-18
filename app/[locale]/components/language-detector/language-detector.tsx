"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { locales, defaultLocale } from "@/i18n/config";
import { createLocalizedUrl, preferredLocaleKey } from "@/app/utils/i18n-utils";

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /** Load the language settings */
    useEffect(() => {
        // Only run on the client side
        if (typeof window === "undefined") return;

        // Get the current locale from the URL
        const pathParts = pathname.split("/");
        const currentLocale = pathParts.length > 1 ? pathParts[1] : "";

        // If the current path doesn't have a valid locale, we might be at the root
        if (!locales.includes(currentLocale)) {
            // We're probably at the root or an invalid path, don't do anything
            return;
        }

        // Check the preferred setting
        const preferredLocale = detectPreferredLocale();
        if (preferredLocale !== currentLocale) {
            const newUrl = createLocalizedUrl(preferredLocale, pathname, searchParams);
            router.replace(newUrl, { scroll: false });
        }
    }, [pathname, router, searchParams]);

    return null;
};
