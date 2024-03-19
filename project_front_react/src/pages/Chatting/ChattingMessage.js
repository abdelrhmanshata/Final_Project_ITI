import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import SendIcon from "@mui/icons-material/Send";
import { axiosInstance } from "api/config";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserItem = ({ item }) => {
  return (
    <Paper
      className="d-flex flex-row gap-2 p-1"
      style={{ alignItems: "center" }}
    >
      <Avatar
        alt="UserImage"
        src={`http://127.0.0.1:9000/${item.image}`}
        sx={{ width: 24, height: 24 }}
      />
      <Typography variant="h6">{item.name}</Typography>
    </Paper>
  );
};

export default function ChattingMessage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [teacher, setTeacher] = useState({});
  const [allTeachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getUserData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTeachers = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setAllTeachers(res.data.data);
          setTeachers(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUserData();
    getTeachers();
  }, []);

  const onClickTeacher = (item) => {
    setTeacher(item);
    console.log(item.name);
  };

  return (
    <>
      <Navbar active={"Chatting"} />

      {/* <Container fixed className="bg-light"> */}
      <Grid container height={"90vh"} style={{ overflow: "hidden" }}>
        <Grid md={3} height={"90vh"} className="p-2 d-flex flex-column ">
          {/* <Button
            variant="contained"
            className="mb-3"
            onClick={() => {
              navigate("/");
            }}
          >
            Back To Home
          </Button> */}
          {/* User Info */}
          <Paper
            className="d-flex flex-row gap-2 p-1 mb-2"
            style={{ alignItems: "center" }}
          >
            <Avatar
              alt="UserImage"
              src={`http://127.0.0.1:9000/${user.image}`}
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h6" className="text-center">
              {user.name}
            </Typography>
          </Paper>

          <Typography variant="h6" className="mt-3">
            Teachers
          </Typography>
          {/* Users */}
          <div
            className="d-flex flex-column gap-2"
            style={{ overflowY: "scroll" }}
          >
            {teachers &&
              teachers.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onClickTeacher(item);
                  }}
                >
                  <UserItem item={item} />
                </div>
              ))}
          </div>
        </Grid>

        {teacher.id && (
          <Grid md={9} className="d-flex flex-column bg-primary h-100 p-2">
            <Paper
              className="d-flex flex-row gap-2 p-1 mb-2"
              style={{ alignItems: "center" }}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={teacher.name}
                  src={`http://127.0.0.1:9000/${teacher.image}`}
                />
              </StyledBadge>
              <Typography variant="h5">{teacher.name}</Typography>
            </Paper>
            <Paper
              className="flex-grow-1 gap-2 p-1 mb-2 "
              style={{
                alignItems: "center",
                overflowY: "scroll",
              }}
            ></Paper>

            {/* Input */}
            <Paper
              className="d-flex flex-row gap-2 p-1 mb-2 "
              style={{
                alignItems: "center",

                bottom: "0px",
              }}
            >
              <TextField
                fullWidth
                multiline
                maxRows={5}
                size="small"
                placeholder="Type of message ..."
              />
              <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
      {/* </Container> */}
    </>
  );
}
