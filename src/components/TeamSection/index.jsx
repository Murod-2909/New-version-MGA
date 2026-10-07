import React from "react";
import { useTranslation } from "react-i18next";
import { getTeam } from "../../data/team";
import "./style.scss";

// Neutral silhouette used only for placeholders, so nobody is mistaken for a real person.
const Silhouette = () => (
  <svg viewBox="0 0 120 120" className="team__silhouette" aria-hidden="true">
    <circle cx="60" cy="46" r="20" />
    <path d="M20 112c0-22 18-38 40-38s40 16 40 38z" />
  </svg>
);

const TeamSection = () => {
  const { t, i18n } = useTranslation();
  const members = getTeam();
  if (members.length === 0) return null;

  return (
    <section className="team">
      <div className="container">
        <h2 className="team__heading">{t("aboutPage.teamTitle")}</h2>
        <ul className="team__grid">
          {members.map((member) => {
            const name = member.placeholder ? t("aboutPage.teamPlaceholderName") : member.name;
            const role = member.placeholder
              ? t("aboutPage.teamPlaceholderRole")
              : member.role?.[i18n.language] || member.role?.en || "";
            return (
              <li key={member.id ?? member.name} className="team__card">
                <div className={`team__photo${member.placeholder ? " is-placeholder" : ""}`}>
                  {member.placeholder ? (
                    <Silhouette />
                  ) : (
                    <img src={member.photo} alt={name} loading="lazy" decoding="async" />
                  )}
                </div>
                <h3 className="team__name" aria-level={3}>
                  {name}
                </h3>
                <p className="team__role">{role}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
