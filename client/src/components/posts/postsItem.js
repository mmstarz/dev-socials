import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../store/actions/postActions";
// moment
import Moment from "react-moment";
// mui els
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
// icons
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreIcon from "@material-ui/icons/More";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 350,
    width: "100%",
    margin: 4,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    "@media(max-width: 800px)": {
      maxWidth: 500,
    },
    "@media (min-width: 800px)": {
      width: "49%",
    },
    "@media (min-width: 1200px)": {
      width: "32%",
    },
  },
  avatar: {
    width: "5rem",
    height: "5rem",
  },
  userLink: {
    fontWeight: 600,
    textDecoration: "none",
    color: "#40474a",
  },
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
    marginBottom: 8,
  },
  comments_btn: {
    color: "#009688",
    marginLeft: 12,
  },
  like_btn: {
    marginLeft: 8,
  },
  btn_more: {
    backgroundColor: "#9C27B0",
    "&:hover": {
      backgroundColor: "#7B1FA2",
    }
  },
  details_box: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyConent: "end",
  },
}));

const PostsItem = ({ post, auth, addLike, remLike, deletePost }) => {
  const classes = useStyles();

  const deleteable = auth.isAuth && auth.user._id === post.user;
  const likeable =
    auth.isAuth &&
    auth.user._id &&
    post.likes.filter((like) => like.user === auth.user._id).length === 0;

  const handleLikes = (post_id) => {
    // console.log("likeable: ", likeable);
    return likeable ? addLike(post_id) : remLike(post_id);
  };

  // text username avatar
  // cardHeader - {avatar username date}
  // cardContent - text
  // expand - comments
  // cardActions - likes remove
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            component={RouterLink}
            to={`/profile/${post.user}`}
            className={classes.avatar}
            aria-label="avatar"
            alt={post.user}
            src={post.avatar}
          />
        }
        action={
          <IconButton
            disabled={!deleteable}
            color="secondary"
            aria-label="delete post"
            onClick={() => deletePost(post._id)}
          >
            <DeleteIcon />
          </IconButton>
        }
        title={
          <RouterLink className={classes.userLink} to={`/profile/${post.user}`}>
            {post.username}
          </RouterLink>
        }
        subheader={<Moment format="YYYY/MM/DD">{post.date}</Moment>}
      />
      <CardContent className={classes.limits}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FavoriteIcon fontSize="large" />}
          onClick={() => handleLikes(post._id)}
        >
          {post.likes.length}
        </Button>

        <Badge
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          color="secondary"
          badgeContent={post.comments.length}
          showZero
        >
          <ChatIcon fontSize="large" className={classes.comments_btn} />
        </Badge>

        <Box className={classes.details_box}>
          <Button
            component={RouterLink}
            to={`/post/${post._id}`}
            variant="contained"
            color="secondary"
            endIcon={<MoreIcon fontSize="large" />}            
            classes={{
              containedSecondary: classes.btn_more
            }}
          >
            details
          </Button>          
        </Box>
      </CardActions>
    </Card>
  );
};

PostsItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (post_id) => {
      dispatch(PostActions.addLike(post_id));
    },
    remLike: (post_id) => {
      dispatch(PostActions.remLike(post_id));
    },
    deletePost: (post_id) => {
      dispatch(PostActions.deletePost(post_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsItem);
