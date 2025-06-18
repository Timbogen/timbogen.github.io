"use client";

import React, { useState } from "react";
import styles from "@/app/[locale]/components/footer/footer.module.scss";
import { useTranslations } from "next-intl";

/**
 * The contact form in the footer
 */
export const Contact: React.FC = () => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const t = useTranslations("components.footer.contact");

    const handleContact = () => {
        // You can replace this with your actual email address
        const email = "niederer.tim@gmail.com";
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
            subject,
        )}&body=${encodeURIComponent(body)}`;
    };
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
            <button className={"button"} onClick={handleContact}>
                <span className={"white-font"}>{t("send")}</span>
            </button>
        </div>
    );
};
