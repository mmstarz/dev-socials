import React from "react";
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {    
    width: "100%",     
    "& .landing-actions": {
      minWidth: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",  
    },
  },
  inner: {
    color: "#fff",  
    width: "95%",
    margin: "auto",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "#2981c766",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  login: {
    color: "#fff",
    backgroundColor: "#00BCD4",
    "&:hover": {
      backgroundColor: "#000"
    }
  },
  register: {
    color: "#fff",
    backgroundColor: "#9C27B0",
    "&:hover": {
      backgroundColor: "#000"
    }
  },  
  link: {
    width: 90,
    border: 0,
    margin: 4,
    display: "block",
    padding: "6px 12px",
    borderRadius: 4,
    fontWeight: 600,
    filter: "drop-shadow(2px 2px 4px cyan)",
    boxShadow: "1px 1px 1px 1px lightcyan",
    "&:hover": {
      boxShadow: "0px 2px 0px 0px #FF9800",
    }
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}    
    >
      <Paper
        elevation={0}
        classes={{
          root: classes.inner,
        }}
      >
        <Typography variant="h2" component="h2" gutterBottom>
          Application name
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create profile/portfolio. Share posts and get help from others.
        </Typography>
        <div className="landing-actions">
          <Link to="/register" className={clsx(classes.link, classes.register)} >Sign Up</Link>
          <Link to="/login" className={clsx(classes.link, classes.login)} >Login</Link>
        </div>
      </Paper>
    </div>
  );
};

export default Landing;
