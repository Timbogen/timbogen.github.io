import React from "react";
import "@/app/styles/globals.scss";
import { defaultLocale } from "@/i18n/config";
import { getMetadata } from "@/app/utils/server.util";

/**
 * By default, generate the English metadata
 */
export const generateMetadata = () => getMetadata(defaultLocale);

/**
 * Root layout
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
