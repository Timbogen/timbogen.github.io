/** The key used for storing the preferred locale in localStorage */
export const preferredLocaleKey = "preferredLocale";

/**
 * Creates a new URL with the target locale, preserving the current path and query parameters
 * @param newLocale The new target locale
 * @param pathname The current pathname
 * @param searchParams Optional search parameters (query string)
 * @returns The new URL with the target locale
 */
export const createLocalizedUrl = (
    newLocale: string,
    pathname: string,
    searchParams: URLSearchParams,
): string => {
    // Extract the pathname without the locale prefix
    let pathnameWithoutLocale = pathname.split("/").slice(2).join("/");
    if (pathnameWithoutLocale.length > 0) pathnameWithoutLocale = `/${pathnameWithoutLocale}`;

    // Get the query parameters as a string, if any
    const params = searchParams?.toString() || "";

    // Construct the new URL with the new locale
    return `/${newLocale}${pathnameWithoutLocale}${params ? `?${params}` : ""}`;
};
