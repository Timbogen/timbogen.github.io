import { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * Metadata for the 404 page
 */
export const metadata: Metadata = {
    title: "404 - Page Not Found",
};

/**
 * Redirect to the home page if a path isn't found
 */
export default function NotFound() {
    redirect(`/`);
}
