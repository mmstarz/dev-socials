import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
// with styles
import {
  BadgeRequired,
  TextSmall,
  TextSmallRequired,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  valid: {
    boxShadow: "0px 2px 0px 0px #21e91e",
  },
  invalid: {
    boxShadow: "0px 2px 0px 0px #f50057",
  },
  untouched: {
    boxShadow: "0px 2px 0px 0px currentColor",
  },
}));

const PostInputs = ({
  elementName,
  elementBody,
  options,
  info,
  error,
  onBlur,
  onChange,
  onFocus,
}) => {
  const classes = useStyles();

  // console.log("element name: ", elementName);
  // console.log("element body: ", elementBody);
  // console.log("element options: ", options);

  const renderField = () => {
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
        {info && !elementBody.required ? <TextSmall>{info}</TextSmall> : null}
      </div>
    );
  };

  return <Fragment>{renderField()}</Fragment>;
};

PostInputs.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  info: PropTypes.string,
  elementName: PropTypes.string.isRequired,
  elementBody: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default PostInputs;
