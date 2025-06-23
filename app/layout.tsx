import React from "react";
import "@/app/styles/globals.scss";
import { generateMetadata as dynamicMetadata } from "@/app/[locale]/layout";
import { defaultLocale } from "@/i18n/config";

/**
 * By default, generate the English metadata
 */
export const generateMetadata = () => dynamicMetadata({ params: Promise.resolve({ locale: defaultLocale }) });

/**
 * Root layout
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
