import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./style.scss";

// Player for a video that lives on Instagram or YouTube (`link` comes from
// parseVideoLink). The iframe is only rendered when the slide is on screen, so
// opening the lightbox doesn't load third-party scripts for every video in it.
// Below the player there is a plain link to the original, which also covers the
// cases where an embed can't be shown (ad blockers, private or removed posts).
const EmbedFrame = ({ link, title }) => {
  const { t } = useTranslation();
  const isInstagram = link.provider === "instagram";
  const src = isInstagram ? link.embedUrl : `${link.embedUrl}?autoplay=1&rel=0`;
  const Icon = isInstagram ? FaInstagram : FaYoutube;

  return (
    <div className={`embed-frame embed-frame--${link.provider}`}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a className="embed-frame__link" href={link.watchUrl} target="_blank" rel="noopener noreferrer">
        <Icon aria-hidden="true" />
        {t(isInstagram ? "galleryPage.openOnInstagram" : "galleryPage.openOnYoutube")}
      </a>
    </div>
  );
};

export default EmbedFrame;
