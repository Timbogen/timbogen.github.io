import React from "react";
import styles from "./experience.module.scss";
import { useTranslations } from "next-intl";
import clsx from "clsx";

/** The languages and frameworks */
const experience = [
    {
        titleKey: "programmingLanguages",
        items: [
            {
                name: "typescript",
                percentage: 95,
            },
            {
                name: "dart",
                percentage: 85,
            },
            {
                name: "c-lang",
                percentage: 70,
            },
            {
                name: "java",
                percentage: 70,
            },
        ],
    },
    {
        titleKey: "frameworksTechnologies",
        items: [
            {
                name: "react",
                percentage: 95,
            },
            {
                name: "nodejs",
                percentage: 85,
            },
            {
                name: "flutter",
                percentage: 85,
            },
            {
                name: "docker",
                percentage: 70,
            },
        ],
    },
];

/**
 * The Experience component
 */
export const Experience: React.FC = () => {
    const t = useTranslations("pages.home.experience");

    return (
        <section className={styles.experience}>
            <h2 id={"experience"}>{t("title")}</h2>
            <p>{t("description")}</p>
            <div className={styles.experienceGrid}>
                {experience.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h4>{t(section.titleKey)}</h4>
                        {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className={styles.experience}>
                                <div className={"icon-box"}>
                                    <span className={clsx("icon-24", `icon-${item.name}`)} />
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.labels}>
                                        <p>
                                            {section.titleKey === "programmingLanguages"
                                                ? t(`languages.${item.name}`)
                                                : t(`frameworks.${item.name}`)}
                                        </p>
                                        <p className={"green-font"}>{item.percentage}%</p>
                                    </div>
                                    <div className={styles.bar}>
                                        <div style={{ width: `${item.percentage}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h4>{t("preferredTools")}</h4>
            <div className={styles.toolsGrid}>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-git`)} />
                    </div>
                    <span>{t("tools.git")}</span>
                </div>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-jetbrains`)} />
                    </div>
                    <span>{t("tools.jetbrains")}</span>
                </div>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-jira`)} />
                    </div>
                    <span>{t("tools.jira")}</span>
                </div>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-figma`)} />
                    </div>
                    <span>{t("tools.figma")}</span>
                </div>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-chatgpt`)} />
                    </div>
                    <span>{t("tools.gpt")}</span>
                </div>
                <div>
                    <div className={"icon-box"}>
                        <span className={clsx("icon-24", `icon-macos`)} />
                    </div>
                    <span>{t("tools.macos")}</span>
                </div>
            </div>
        </section>
    );
};
