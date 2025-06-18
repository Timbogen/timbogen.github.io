import React from "react";
import styles from "./home.module.scss";
import clsx from "clsx";
import { Experience } from "./components/experience/experience";
import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * The home page
 */
export const Home: React.FC = () => {
    const t = useTranslations("pages.home");

    return (
        <div className={clsx("max-width", styles.home)}>
            <div className={"max-width-content"}>
                <section className={styles.intro}>
                    <div className={"light-grey-box-frame"}>
                        <img
                            width={500}
                            height={500}
                            src={"/tim.png"}
                            alt="Tim Niederer"
                            className={styles.profileImage}
                        />
                    </div>
                    <div className={styles.introText}>
                        <h1 className={"green-font"}>Tim Niederer</h1>
                        <h3 className={"white-font"}>{t("intro")}</h3>
                        <Link className={"button"} href={"#contact"}>
                            <span className={"white-font"}> {t("contactMe")}</span>
                        </Link>
                    </div>
                </section>

                <section>
                    <h2 id={"service"}>{t("whatIOffer")}</h2>
                    <p className={"white-font"}>{t("offerDescription")}</p>
                    <div className={styles.offerGrid}>
                        <div className={clsx("green-box-frame", styles.offerBox)}>
                            <svg className={"white-font"} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                            </svg>
                            <h4>{t("webFullstack")}</h4>
                            <p className={"black-font"}>{t("webDescription")}</p>
                        </div>
                        <div className={clsx("green-box-frame", styles.offerBox)}>
                            <svg className={"white-font"} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v124q18 7 29 22t11 34v80q0 19-11 34t-29 22v404q0 33-23.5 56.5T680-40H280Zm0-80h400v-720H280v720Zm0 0v-720 720Zm200-600q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z" />
                            </svg>
                            <h4>{t("mobile")}</h4>
                            <p className={"black-font"}>{t("mobileDescription")}</p>
                        </div>
                        <div className={clsx("light-grey-box-frame", styles.offerBox)}>
                            <svg className={"green-font"} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
                            </svg>
                            <h4 className={"green-font"}>{t("other")}</h4>
                            <p className={"black-font"}>{t("otherDescription")}</p>
                        </div>
                    </div>
                </section>

                <Experience />

                <section>
                    <h2>{t("but")}</h2>
                    <p className={"white-font"}>{t("butDescription")}</p>
                </section>

                <section>
                    <h2 id={"resume"}>{t("myPath")}</h2>
                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineIcon}></div>
                            <p className={"white-font"}>{t("timeline2015")}</p>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineIcon}></div>
                            <p className={"white-font"}>{t("timeline2018")}</p>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineIcon}></div>
                            <p className={"white-font"}>{t("timeline2021")}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
