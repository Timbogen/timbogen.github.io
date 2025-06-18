import clsx from "clsx";
import { useTranslations } from "next-intl";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

/**
 * The legal-notice
 */
export default function Imprint({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    setRequestLocale(locale);
    const t = useTranslations("pages.legal.legalNotice");

    return (
        <main className={"max-width"}>
            <section className={clsx("text", "max-width-content")}>
                <h1>{t("title")}</h1>
                <h2>{t("name")}</h2>
                <p>
                    {t("address")}
                    <br />
                    {t("city")}
                    <br />
                    {t("country")}
                </p>
                <br />
                <h2>{t("contactTitle")}</h2>
                <p>
                    {t("phone")}: 01712089964
                    <br />
                    {t("email")}: niederer.tim@gmail.com
                </p>
                <br />
                <br />
                <p>
                    {t("source")}:{" "}
                    <a target={"_blank"} href="https://www.e-recht24.de/impressum-generator.html">
                        https://www.e-recht24.de/impressum-generator.html
                    </a>
                </p>
            </section>
        </main>
    );
}
