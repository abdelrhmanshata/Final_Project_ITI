import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";
import { BiFile, BiSolidRightArrow } from "react-icons/bi";

const Section = ({ sectionData }) => {
  const [videos, setVideos] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`/course/section/${sectionData.id}/getAllVideos/`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setVideos(res.data.message);
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
              <IconButton edge="end" aria-label="delete">
                <BiSolidRightArrow />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <BiFile size={24} />
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
