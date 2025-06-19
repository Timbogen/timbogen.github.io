"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Language } from "@/app/[locale]/components/language/language";
import { Drawer } from "vaul";
import { useState } from "react";

/** The available links in the header */
const links = ["service", "experience", "resume", "contact"];

/** The navigation component */
export const Navigation = ({ locale }: { locale: string }) => {
    const t = useTranslations("components.header");
    const [open, setOpen] = useState(false);

    // Navigation links component
    const navigationLinks = (
        <>
            {links.map((link, index) => (
                <Link
                    key={index}
                    onClick={() => setOpen(false)}
                    href={`/${locale}#${link}`}
                    className={clsx(styles.link, "anchor")}
                >
                    <span className={"white-font"}>{t(link)}</span>
                </Link>
            ))}
        </>
    );

    return (
        <>
            {/* Desktop navigation */}
            <nav className={styles.navigation}>
                {navigationLinks}
                <Language />
            </nav>
            {/* Mobile navigation */}
            <div className={clsx(styles.mobileContainer, "max-width")}>
                <Language />
                <Drawer.Root open={open} onOpenChange={setOpen}>
                    <Drawer.Trigger asChild>
                        <button className={"white-square-button"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                aria-label={t("menu")}
                            >
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                            </svg>
                        </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className={"bottomSheetOverlay"} />
                        <Drawer.Content className={"bottomSheetContent"} aria-describedby={undefined}>
                            <Drawer.Title hidden>{t("navigation")}</Drawer.Title>
                            <Drawer.Handle className={"dragIndicator"} />
                            <nav className={styles.mobileNavigation}>{navigationLinks}</nav>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </div>
        </>
    );
};
