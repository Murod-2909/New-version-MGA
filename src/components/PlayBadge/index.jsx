import React from "react";
import { FaPlay } from "react-icons/fa";
import { formatDuration } from "../../data/media";
import "./style.scss";

// Round play button laid over a video's poster, with the clip length when known.
// Purely decorative: the surrounding button/link carries the accessible label.
const PlayBadge = ({ duration }) => {
  const length = formatDuration(duration);
  return (
    <>
      <span className="play-badge" aria-hidden="true">
        <FaPlay />
      </span>
      {length && (
        <span className="play-badge__duration" aria-hidden="true">
          {length}
        </span>
      )}
    </>
  );
};

export default PlayBadge;
