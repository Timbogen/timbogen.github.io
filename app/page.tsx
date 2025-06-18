import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Redirect the user to the default locale when `/` is requested */
export default function RootPage() {
    redirect(`/${defaultLocale}`);
}
