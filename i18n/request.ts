import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n/config";

/** The main config for next-intl */
export default getRequestConfig(async ({ requestLocale }) => {
    // Validate whether the incoming `locale` parameter is valid
    const requestedLocale = await requestLocale;
    const locale = requestedLocale ?? defaultLocale;
    if (!locales.includes(locale)) {
        notFound();
    }

    // Create the next-intl config
    return {
        locale,
        messages: (await import(`./${locale}.json`)).default,
    };
});
