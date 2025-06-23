import type { Metadata } from "next";
import React from "react";
import { Header } from "@/app/[locale]/components/header/header";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { defaultLocale, locales } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/app/[locale]/components/footer/footer";
import { Matrix } from "@/app/[locale]/components/matrix/matrix";
import { LanguageDetector } from "@/app/[locale]/components/language-detector/language-detector";
import { Big_Shoulders_Text } from "next/font/google";
import { getMetadata } from "@/app/utils/server.util";

/** The general font */
const bigShouldersText = Big_Shoulders_Text({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-big",
});

/** Generate metadata for the website based on locale */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = (await params).locale ?? defaultLocale;
    return getMetadata(locale);
}

/** This function tells Next.js which locales to build */
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

/** The localized layout */
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(locales, locale)) {
        notFound();
    } else {
        setRequestLocale(locale);
    }

    // Render the main layout
    return (
        <html lang={locale}>
            <body className={bigShouldersText.variable}>
                <NextIntlClientProvider>
                    <LanguageDetector />
                    <Matrix />
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
