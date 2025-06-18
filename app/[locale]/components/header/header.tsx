import styles from "./header.module.scss";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { Navigation } from "./navigation";

/** The header component */
export const Header = () => {
    const t = useTranslations("components.header");
    const locale = useLocale();

    return (
        <header className={clsx(styles.header, "max-width")}>
            <div className={clsx(styles.content, "max-width-content")}>
                <Link href={`/${locale}`} className={clsx(styles.logo, "anchor")}>
                    <span className={"white-font"}>{t("logoText")}</span>
                </Link>
                <Navigation locale={locale} />
            </div>
        </header>
    );
};
