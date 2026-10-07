import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./style.scss";

// A YouTube video that costs nothing until it is played: a thumbnail and play button
// are shown, and the player (with its cookies and ~1 MB of scripts) loads on click,
// from the privacy-friendly youtube-nocookie.com domain.
const YouTubeFacade = ({ videoId, title }) => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  if (playing) {
    return (
      <div className="yt-facade">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="yt-facade yt-facade--idle"
      onClick={() => setPlaying(true)}
      aria-label={`${t("galleryPage.playVideo")}: ${title}`}
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        // maxresdefault doesn't exist for every video; hqdefault always does.
        onError={() => setThumb(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
      />
      <span className="yt-facade__play" aria-hidden="true">
        <FaPlay />
      </span>
    </button>
  );
};

export default YouTubeFacade;
