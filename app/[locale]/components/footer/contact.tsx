"use client";

import React, { useState } from "react";
import styles from "@/app/[locale]/components/footer/footer.module.scss";
import { useTranslations } from "next-intl";
import clsx from "clsx";

/** The email address */
const email = "niederer.tim@gmail.com";

/**
 * The contact form in the footer
 */
export const Contact: React.FC = () => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const t = useTranslations("components.footer.contact");

    return (
        <div className={styles.contactSection}>
            <h3 id={"contact"} className={"white-font"}>
                {t("title")}
            </h3>
            <div className={"input"}>
                <input
                    id={"reference"}
                    type="text"
                    placeholder={t("subject")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            <div className={"input"}>
                <textarea
                    id={"message"}
                    placeholder={t("message")}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <a
                className={clsx("button", !subject || !body ? "disabled" : "")}
                target={"_blank"}
                href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
            >
                <span className={"white-font"}>{t("send")}</span>
            </a>
        </div>
    );
};
