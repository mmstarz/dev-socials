import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// els
import Moment from "react-moment";
// mui els
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  notCurrent: {
    background: "#4CAF50",
  },
  current: {
    background: "#9C27B0",
  },
  content: {
    background: "#546E7A",
  },
  actionButton: {
    color: "white",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  textField: {
    padding: "4px 8px",
    marginBottom: 4,
    fontSize: "small",
    fontWeight: 600,
    color: "white",
  },
  textLable: {
    color: "white",
    textTransform: "capitalize",
  },
}));

const EduDetails = ({
  degree,
  fieldofstudy,
  from,
  to,
  description,
  current,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = [
    { degree },
    { fieldofstudy },
    { from },
    { to: to ? to : "-- not finished --" },
    { description: description ? description : "-- no cdescription --" },
  ];

  // <Moment format="YYYY/MM/DD">{data[1]}</Moment>

  const renderFields = () => {
    return data.map((field, idx) => {
      const [data] = Object.entries(field);

      if (data[0] === "from") {
        data[1] = <Moment format="YYYY/MM/DD">{data[1]}</Moment>;
      }

      if (data[0] === "to" && !current) {
        data[1] = <Moment format="YYYY/MM/DD">{data[1]}</Moment>;
      }

      return (
        <Box key={idx} className={classes.limits}>
          <Typography
            className={classes.textLable}
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {data[0]}:
          </Typography>
          <Typography
            className={classes.textField}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {data[1]}
          </Typography>
        </Box>
      );
    });
  };

  return (
    <Fragment>
      <CardActions
        classes={{
          root: current ? classes.current : classes.notCurrent,
        }}
        disableSpacing
      >
        <Typography variant="h6" className={classes.textWhite}>
          Details:
        </Typography>
        <IconButton
          classes={{
            root: classes.actionButton,
          }}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          classes={{
            root: classes.content,
          }}
        >
          {renderFields()}
        </CardContent>
      </Collapse>
    </Fragment>
  );
};

EduDetails.propTypes = {
  degree: PropTypes.string.isRequired,
  fieldofstudy: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  current: PropTypes.bool,
  to: PropTypes.string,
  description: PropTypes.string,
};

export default EduDetails;
