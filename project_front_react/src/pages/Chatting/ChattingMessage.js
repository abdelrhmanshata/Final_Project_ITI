import Pusher from "pusher-js";
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
  const [user, setUser] = useState({});
  const [userSelect, setUserSelect] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const pusher = new Pusher("6ce880651d2a4a0c94b1", {
    cluster: "eu",
  });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

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
          setTeachers(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getStudents = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Students`)
        .then((res) => {
          setStudents(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getMessages = async () => {
    Pusher.logToConsole = true;
    pusher.connect();
    pusher.connection.bind("connected", () => {
      const channel = pusher.subscribe("chat");
      channel.bind("message", function (data) {
        allMessages.push(data);
        setMessages(allMessages);
      });
    });
  };

  useEffect(() => {
    getUserData();
    getTeachers();
    getStudents();
    getMessages();
  }, []);

  const onClickTeacher = (item) => {
    setUserSelect(item);
    setMessages([]);
    allMessages = [];
    pusher.disconnect();
  };

  const onSendMessage = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const sendMessage = {
        username: user.name,
        message: message,
      };

      try {
        const response = await axiosInstance.post(
          "chatapi/messages",
          sendMessage,
          {
            headers: { "Content-type": "application/json" },
          }
        );
        if (response.status == 200) {
          setMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const sendMessage = {
      username: user.name,
      message: message,
    };

    try {
      const response = await axiosInstance.post(
        "chatapi/messages",
        sendMessage,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      if (response.status == 200) {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar active={"Chatting"} />

      <Grid container height={"90vh"} style={{ overflow: "hidden" }}>
        <Grid md={3} height={"90vh"} className="p-2 d-flex flex-column ">
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

          {user.usertype === "teacher" || user.usertype !== "student" ? (
            <>
              {students.length > 0 && (
                <Typography variant="h6" className="mt-3">
                  Students
                </Typography>
              )}
              <div
                className="d-flex flex-column gap-2"
                style={{ overflowY: "scroll" }}
              >
                {students &&
                  students.map((item, index) => (
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
            </>
          ) : null}

          {user.usertype === "student" || user.usertype !== "teacher" ? (
            <>
              {teachers.length > 0 && (
                <Typography variant="h6" className="mt-3">
                  Teachers
                </Typography>
              )}
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
            </>
          ) : null}
        </Grid>

        {userSelect.id && (
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
                  alt={userSelect.name}
                  src={`http://127.0.0.1:9000/${userSelect.image}`}
                />
              </StyledBadge>
              <Typography variant="h5">{userSelect.name}</Typography>
            </Paper>
            <Paper
              className="flex-grow-1 gap-2 p-1 mb-2 "
              style={{
                alignItems: "center",
                overflowY: "scroll",
              }}
            >
              {messages.map((item) => {
                return (
                  <div className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">{item.username}</strong>
                    </div>
                    <div className="col-10 mb-1 small">{item.message}</div>
                  </div>
                );
              })}
            </Paper>

            {/* Input */}
            <Paper
              className="d-flex flex-row gap-2 p-1 mb-2 "
              style={{
                alignItems: "center",
                bottom: "0px",
              }}
            >
              <form onSubmit={(e) => submit(e)} className="flex-grow-1">
                <TextField
                  fullWidth
                  multiline
                  maxRows={5}
                  size="small"
                  value={message}
                  placeholder="Type of message ..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
              {message.length > 0 && (
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={onSendMessage}
                >
                  Send
                </Button>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}
