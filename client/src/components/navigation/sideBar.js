import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
// menu
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    "& .sideDrawer": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "250px",
      minHeight: "100vh",
      transition: "transform 200ms ease-in",
      zIndex: 2,
      // background: "white", // #263238
      background: "#0b0f11",
      "&.hide": {
        transform: "translateX(-100%)",
      },
      "&.show": {
        transform: "translateX(0%)",
      },
    },
    "& .backdrop": {
      position: "absolute",
      minHeight: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.7)",
      zIndex: 1,
      "&.hide": {
        display: "none",
      },
      "&.show": {
        display: "block",
      },
    },
  },
  list: {
    width: 250,
  },
  iconColor: {
    color: "#17a2b8", // #17a2b8
  },
}));

const SideBar = ({ show, click, navList }) => {
  const classes = useStyles();

  const renderIcon = (dest) => {
    switch (dest) {
      case "/dashboard":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <DashboardIcon />
          </ListItemIcon>
        );
      case "/posts":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <InboxIcon />
          </ListItemIcon>
        )
      case "/developers":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <AccountBoxIcon />
          </ListItemIcon>
        )
      case "/register":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <HowToRegIcon />
          </ListItemIcon>
        )
      case "/login":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <MeetingRoomIcon />
          </ListItemIcon>
        )
      default:
        // code...
        break;
    }
  };

  const renderMenuList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={click}
      onKeyDown={click}
    >
      <Divider />
      <List>
        {navList.map((item, index) => (
          <Link
            onClick={click}
            key={item.name}
            to={item.to}
            style={{ color: "white" }}
          >
            <ListItem button>
              {renderIcon(item.to)}              
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <div
        className={show ? "sideDrawer show" : "sideDrawer hide"}
        onClick={click}
      >
        {renderMenuList()}
      </div>
      <div
        className={show ? "backdrop show" : "backdrop hide"}
        onClick={click}
      ></div>
    </div>
  );
};

export default SideBar;
