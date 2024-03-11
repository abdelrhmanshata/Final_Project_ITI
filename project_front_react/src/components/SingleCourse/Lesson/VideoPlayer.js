import { Typography } from "@mui/material";
import { useState } from "react";
import YouTube from "react-youtube";

export default function VideoPlayer({ videoId }) {
  const [player, setPlayer] = useState(null);
  const onReady = (event) => {
    setPlayer(event.target);
    console.log(player);
  };

  return (
    <>
      <div className="d-flex flex-column gap-4">
        <YouTube
          videoId={videoId}
          opts={{ width: "100%", height: "360" }}
          style={{ minHeight: "360" }}
          onReady={onReady}
        />
        <Typography variant="h4">UI/UX Design</Typography>
        <Typography variant="body2">
          User Interface Design Essentials - UI/UX Design
        </Typography>
      </div>
    </>
  );
}
