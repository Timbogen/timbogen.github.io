import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

/**
 * Returns the metadata for a given locale
 */
export const getMetadata = async (locale: string): Promise<Metadata> => {
    const t = await getTranslations({ locale, namespace: "pages.metadata" });

    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("openGraph.title"),
            description: t("openGraph.description"),
            type: "website",
            images: ["https://timlikes.tech/icon.png"],
            countryName: t("openGraph.countryName"),
            url: "https://timlikes.tech",
        },
    };
};
