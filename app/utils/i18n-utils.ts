/** The key used for storing the preferred locale in localStorage */
export const preferredLocaleKey = "preferredLocale";

/**
 * Creates a new URL with the target locale, preserving the current path and query parameters
 * @param newLocale The new target locale
 * @returns The new URL with the target locale
 */
export const createLocalizedUrl = (newLocale: string): string => {
    // Extract the pathname without the locale prefix
    const pathname = window.location.pathname;
    let pathnameWithoutLocale = pathname.split("/").slice(2).join("/");
    if (pathnameWithoutLocale.length > 0) pathnameWithoutLocale = `/${pathnameWithoutLocale}`;

    // Construct the new URL with the new locale
    return `/${newLocale}${pathnameWithoutLocale}${window.location.hash}${window.location.search}`;
};
