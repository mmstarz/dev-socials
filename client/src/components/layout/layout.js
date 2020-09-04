import React from "react";
import { withRouter } from "react-router-dom";
// components
import Header from "./header";
import Footer from "./footer";
import Navigation from "../navigation/navigation";
import Notifications from './notifications';
import imgsrc from "../../img/showcase.jpg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
    backgroundSize: "100% 100% !important",
    backgroundBlendMode: "color-burn !important",

    minHeight: "100vh",
    "& > section": {
      width: "100%",
    },
  },
}));

const Layout = ({ children, match }) => {
  const classes = useStyles();

  const index = match.url === "/";

  return (
    <div
      className={classes.root}
      style={{
        background: index
          ? `linear-gradient(#00695C, #8BC34A), url(${imgsrc})`
          : `linear-gradient(#00695C, #8BC34A), url(${imgsrc})`,
      }}
    >
      <Navigation />
      <Header />
      <section>
        {children}
      </section>
      <Notifications />
      <Footer />      
    </div>
  );
};

export default withRouter(Layout);
