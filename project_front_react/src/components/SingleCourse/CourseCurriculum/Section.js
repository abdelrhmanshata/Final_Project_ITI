import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { useDispatch } from "react-redux";
import { selectVideo } from "store/slices/video";
import { BiSolidRightArrow, BiVideo } from "react-icons/bi";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const Section = ({ sectionData, index, isPlay }) => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`/course/section/${sectionData.id}/getAllVideos/`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setVideos(res.data.message);
            if (index === 0) {
              dispatch(selectVideo(res.data.message[0]));
            }
          } else {
            setVideos([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [sectionData.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {videos.map((video) => (
        <>
          <ListItem
            secondaryAction={
              <>
                {isPlay ? (
                  <IconButton
                    edge="end"
                    aria-label="select"
                    onClick={() => dispatch(selectVideo(video))}
                  >
                    <BiSolidRightArrow />
                  </IconButton>
                ) : null}
              </>
            }
          >
            <ListItemAvatar>
              <BiVideo size={24} />
            </ListItemAvatar>
            <ListItemText
              primary={video.videoTitle}
              secondary={
                video.videoDescription.length < 50
                  ? video.videoDescription
                  : null
              }
            />
          </ListItem>
        </>
      ))}
    </>
  );
};

export default Section;
