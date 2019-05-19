import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
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
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
