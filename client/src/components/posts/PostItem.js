import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showActions,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div className="card card-body mb-3">
    <div className="row">
      <div className="col-md-2">
        <Link to={`/profile/${user}`}>
          <img
            className="rounded-circle d-none d-md-block"
            src={
              avatar
                ? avatar
                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
            }
            alt=""
          />
        </Link>
        <br />
        <p className="text-center">{name}</p>
      </div>
      <div className="col-sm-10">
        <p className="lead" style={{ marginTop: "10px" }}>
          {text}
        </p>
        <p className="post-date">
          Posted on{" "}
          <Moment format="YYYY/MM/DD" style={{ color: "teal" }}>
            {date}
          </Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => addLike(_id)}
            >
              <i className="fas fa-thumbs-up" style={{ color: "grey" }} />
              <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={{ marginLeft: "12px" }}
              onClick={() => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down" style={{ color: "grey" }} />
            </button>
            <br />
            <Link
              to={`/posts/${_id}`}
              className="btn btn-dark"
              style={{ marginTop: "20px" }}
            >
              Comments{" "}
              {comments.length > 0 && (
                <span className="comment-count">: {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                style={{ marginLeft: "5em", marginTop: "20px" }}
                type="button"
                className="btn btn-danger"
                onClick={e => deletePost(_id)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
