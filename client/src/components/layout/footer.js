import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // height: "100px", // ? 100px
    marginTop: "auto",
    background: "transparent"
  },
}));

const Footer = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default Footer;
