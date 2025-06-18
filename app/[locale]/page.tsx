import { Home } from "@/app/[locale]/home/home";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

/** The home page */
export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    setRequestLocale(locale);
    return <Home />;
}
