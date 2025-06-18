"use client";

import React, { useState, useTransition } from "react";
import { Drawer } from "vaul";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./language.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales } from "@/i18n/config";
import clsx from "clsx";
import { createLocalizedUrl, preferredLocaleKey } from "@/app/utils/i18n-utils";

/**
 * The language options
 */
const languages: Record<
    string,
    {
        name: string;
        icon: React.JSX.Element;
    }
> = {
    de: {
        name: "Deutsch",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5 3"
                width="24"
                height="18"
                aria-label={"Deutsche Flagge"}
            >
                <rect width="5" height="3" y="0" x="0" fill="#000" />
                <rect width="5" height="2" y="1" x="0" fill="#D00" />
                <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
            </svg>
        ),
    },
    en: {
        name: "English",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 30"
                width="24"
                height="18"
                aria-label={"British Flag"}
            >
                <clipPath id="s">
                    <path d="M0,0 v30 h60 v-30 z" />
                </clipPath>
                <clipPath id="t">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                </clipPath>
                <g clipPath="url(#s)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                </g>
            </svg>
        ),
    },
};

/**
 * A responsive language switcher
 */
export const Language: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const t = useTranslations("components.language");

    /**
     * Switch the language on select, preserving query parameters and the URL hash.
     * Also saves the selection to localStorage for future visits.
     */
    const onSelectChange = (newLocale: string) => {
        setOpen(false);
        startTransition(() => {
            // Save the selected locale to localStorage
            localStorage.setItem(preferredLocaleKey, newLocale);
            // Create the new URL with the target locale
            const newUrl = createLocalizedUrl(newLocale, pathname, searchParams);
            router.replace(newUrl, { scroll: false });
        });
    };

    // Desktop view (dropdown menu)
    const desktopView = (
        <div className={styles.desktopView}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className={clsx(styles.languageTrigger, "anchor")} disabled={isPending}>
                        {languages[locale]?.icon}
                        <span className={"white-font"}>{languages[locale]?.name}</span>
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className={clsx("dropdownContent", "dark-grey-box-frame")} sideOffset={8}>
                        {/* Radix Items need to be direct children, so we can't use MenuContent here */}
                        {locales.map((locale) => (
                            <DropdownMenu.Item
                                key={locale}
                                className={"dropdownItem"}
                                onSelect={() => onSelectChange(locale)}
                            >
                                {languages[locale]?.icon}
                                <span className={"white-font"}>{languages[locale]?.name}</span>
                            </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );

    // Mobile view (drawer)
    const mobileView = (
        <div className={styles.mobileView}>
            <Drawer.Root open={open} onOpenChange={setOpen}>
                <Drawer.Trigger asChild>
                    <button className={"white-square-button"} disabled={isPending}>
                        {languages[locale]?.icon}
                    </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className={"bottomSheetOverlay"} />
                    <Drawer.Content className={"bottomSheetContent"}>
                        <Drawer.Title className={"hidden"}>{t("selectLanguage")}</Drawer.Title>
                        <Drawer.Handle className={"dragIndicator"} />
                        <ul>
                            {locales.map((locale) => (
                                <li key={locale} onClick={() => onSelectChange(locale)}>
                                    <div className={styles.flagContainer}>{languages[locale]?.icon}</div>
                                    <span className={"white-font"}>{languages[locale]?.name}</span>
                                </li>
                            ))}
                        </ul>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );

    return (
        <>
            {desktopView}
            {mobileView}
        </>
    );
};
