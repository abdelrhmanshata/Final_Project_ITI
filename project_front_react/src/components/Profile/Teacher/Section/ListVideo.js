import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";
import { BiVideo } from "react-icons/bi";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import EditVideo from "./EditVideo";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function ListVideo({ sectionID }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`/course/section/${sectionID}/getAllVideos/`)
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
  }, []);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  const deleteVideo = async (id) => {
    console.log(id);
    try {
      await axiosInstance
        .get(`/course/deleteAVideo/${id}`)
        .then((res) => {
          setMessage(res.data.message);
          setOpen(true);
          dispatch(updateState(isUpdate + 1));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {videos.map((video, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <>
              <EditVideo video={video} />
              <IconButton edge="end" aria-label="delete">
                <MdOutlineDeleteForever
                  color="red"
                  onClick={() => {
                    deleteVideo(video.id);
                  }}
                />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            <BiVideo size={24} />
          </ListItemAvatar>
          <ListItemText
            primary={video.videoTitle}
            secondary={
              video.videoDescription.length < 50 ? video.videoDescription : null
            }
          />
        </ListItem>
      ))}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
}
