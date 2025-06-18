import styles from "./footer.module.scss";
import { Contact } from "@/app/[locale]/components/footer/contact";
import clsx from "clsx";
import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

/**
 * The footer
 */
export const Footer: React.FC = () => {
    const locale = useLocale();
    const t = useTranslations("components.footer");
    const at = useTranslations("accessibility");

    return (
        <footer className={clsx(styles.footer, "max-width")}>
            <div className={"max-width-content"}>
                <Contact />
                <div className={styles.footerLinks}>
                    <h3 className={"white-font"}>{t("otherContacts")}</h3>
                    <div className={"dark-grey-box-frame"}>
                        <a target={"_blank"} className={"anchor"} href="mailto:niederer.tim@gmail.com">
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                aria-label={at("emailIcon")}
                            >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>
                            <span className={"white-font"}>niederer.tim@gmail.com</span>
                        </a>
                        <a target={"_blank"} className={"anchor"} href="tel:+491712089964">
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                aria-label={at("phoneIcon")}
                            >
                                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                            </svg>
                            <span className={"white-font"}>+49 171 2089964</span>
                        </a>
                        <a
                            target={"_blank"}
                            className={"anchor"}
                            href="https://www.linkedin.com/in/tim-niederer-44992420b/"
                        >
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                aria-label={at("linkedinIcon")}
                            >
                                <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span className={"white-font"}>LinkedIn</span>
                        </a>
                        <a target={"_blank"} className={"anchor"} href="https://github.com/Timbogen">
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                aria-label={at("githubIcon")}
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className={"white-font"}>GitHub</span>
                        </a>
                    </div>
                    <h3 className={"white-font"}>{t("pages")}</h3>
                    <div className={"dark-grey-box-frame"}>
                        <Link className={"anchor"} href={`/${locale}/legal/legal-notice`}>
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                aria-label={at("linkIcon")}
                            >
                                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                            </svg>
                            <span className={"white-font"}>{t("legalNotice")}</span>
                        </Link>
                        <Link className={"anchor"} href={`/${locale}/legal/privacy`}>
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                aria-label={at("linkIcon")}
                            >
                                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                            </svg>
                            <span className={"white-font"}>{t("privacy")}</span>
                        </Link>
                        <Link className={"anchor"} href={`/${locale}`}>
                            <svg
                                className={"white-font"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                aria-label={at("linkIcon")}
                            >
                                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                            </svg>
                            <span className={"white-font"}>{t("home")}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
