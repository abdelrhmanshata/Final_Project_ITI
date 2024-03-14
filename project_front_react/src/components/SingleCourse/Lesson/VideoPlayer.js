import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

export default function VideoPlayer() {
  const dataVideo = useSelector((state) => state.video.video);
  const [player, setPlayer] = useState(null);
  const onReady = (event) => {
    setPlayer(event.target);
    console.log(player);
  };

  return (
    <>
      <div className="d-flex flex-column gap-4">
        <YouTube
          videoId={dataVideo.videoLink}
          opts={{ width: "100%", height: "360" }}
          style={{ minHeight: "360" }}
          onReady={onReady}
        />
        <Typography variant="h4">{dataVideo.videoTitle}</Typography>
        <Typography variant="body2">{dataVideo.videoDescription}</Typography>
      </div>
    </>
  );
}
