import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  BiFile,
  BiLockAlt,
  BiMoviePlay,
  BiSolidRightArrow,
} from "react-icons/bi";

export default function Curriculum() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div className="d-flex flex-column py-4 gap-2">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Section1
        </AccordionSummary>
        <AccordionDetails>
          <List dense={dense}>
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
                primary="Introduction to the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      {/*  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Section2
        </AccordionSummary>
        <AccordionDetails>
          <List dense={dense}>
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
                primary="Introduction to the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      {/*  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Section3
        </AccordionSummary>
        <AccordionDetails>
          <List dense={dense}>
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
                primary="Introduction to the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <BiLockAlt />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <BiMoviePlay size={24} />
              </ListItemAvatar>
              <ListItemText
                primary="Structure of the course"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
