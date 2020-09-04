import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
// with styles
import {
  BadgeRequired,
  TextSmall,
  TextSmallRequired,
} from "../../../widgets/withStyles/withStyles";
// icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  checkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    boxShadow: "0px 2px 0px 0px #607D8B",
    "& input": {
      width: "1rem",
      height: "1rem",
      margin: "0 8px 0 0",
      "&:focus": {
        outline: "none",
        background: "aliceblue",
        boxShadow: "none",
      },
    },
    "& p": {
      color: "black",
      margin: 0,
      fontSize: "medium",
      fontWeight: 600,
    },
  },
  valid: {
    boxShadow: "0px 2px 0px 0px #21e91e",
  },
  invalid: {
    boxShadow: "0px 2px 0px 0px #f50057",
  },
  untouched: {
    boxShadow: "0px 2px 0px 0px currentColor",
  },
  tw: {
    fill: "#03A9F4",
  },
  fb: {
    fill: "#3F51B5",
  },
  in: {
    fill: "#2196F3",
  },
  yt: {
    fill: "crimson",
  },
  ins: {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
    fill: "white",
  },
}));

const ProfileInputs = ({
  elementName,
  elementBody,
  options,
  info,
  social,
  error,
  onBlur,
  onChange,
  onFocus,
}) => {
  const classes = useStyles();

  // console.log("element name: ", elementName);
  // console.log("element body: ", elementBody);
  // console.log("element options: ", options);

  const renderSocial = () => {
    if (social === "twitter")
      return (
        <TwitterIcon
          classes={{
            root: classes.tw,
          }}
        />
      );
    if (social === "facebook")
      return (
        <FacebookIcon
          classes={{
            root: classes.fb,
          }}
        />
      );
    if (social === "youtube")
      return (
        <YouTubeIcon
          classes={{
            root: classes.yt,
          }}
        />
      );
    if (social === "linkedin")
      return (
        <LinkedInIcon
          classes={{
            root: classes.in,
          }}
        />
      );
    if (social === "instagram")
      return (
        <InstagramIcon
          classes={{
            root: classes.ins,
          }}
        />
      );
  };

  const renderField = () => {
    switch (elementName) {
      case "checkbox":
        return (
          <div className="form-group">
            <div
              className={
                options.typed
                  ? options.valid
                    ? clsx(classes.checkContainer, classes.valid)
                    : clsx(classes.checkContainer, classes.invalid)
                  : clsx(classes.checkContainer, classes.untouched)
              }
            >
              <input
                {...elementBody}
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
              />
              {info && !elementBody.required ? (
                <TextSmall>{info}</TextSmall>
              ) : null}
            </div>
            {info && elementBody.required ? (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            ) : null}
          </div>
        );
      case "textarea":
        return (
          <div className="form-group">
            <textarea
              className={
                options.typed
                  ? options.valid
                    ? classes.valid
                    : classes.invalid
                  : classes.untouched
              }
              {...elementBody}
              onFocus={(e) => onFocus(e)}
              onBlur={(e) => onBlur(e)}
              onChange={(e) => onChange(e)}
            ></textarea>
            {info && elementBody.required ? (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            ) : null}
            {info && !elementBody.required ? (
              <TextSmall>{info}</TextSmall>
            ) : null}
          </div>
        );
      case "select":
        return (
          <div className="form-group">
            <select
              {...elementBody}
              className={
                options.typed
                  ? options.valid
                    ? classes.valid
                    : classes.invalid
                  : classes.untouched
              }
              onFocus={(e) => onFocus(e)}
              onBlur={(e) => onBlur(e)}
              onChange={(e) => onChange(e)}
            >
              {elementBody.options.map((op, idx) => {
                return (
                  <option key={idx} {...op}>
                    {op.name}
                  </option>
                );
              })}
            </select>
            {info && elementBody.required ? (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            ) : null}
            {info && !elementBody.required ? (
              <TextSmall>{info}</TextSmall>
            ) : null}
          </div>
        );
      default:
        return (
          <Fragment>
            <div className="form-group">
              {social && renderSocial()}
              <input
                className={
                  options.typed
                    ? options.valid
                      ? classes.valid
                      : classes.invalid
                    : classes.untouched
                }
                {...elementBody}
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
              />
              {info && elementBody.required ? (
                <BadgeRequired
                  variant="dot"
                  color={options.valid ? "primary" : "secondary"}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <TextSmallRequired>{info}</TextSmallRequired>
                </BadgeRequired>
              ) : null}
              {info && !elementBody.required ? (
                <TextSmall>{info}</TextSmall>
              ) : null}
            </div>
          </Fragment>
        );
    }
  };

  return <Fragment>{renderField()}</Fragment>;
};

ProfileInputs.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  info: PropTypes.string,
  elementName: PropTypes.string.isRequired,
  elementBody: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  social: PropTypes.string,
};

export default ProfileInputs;
