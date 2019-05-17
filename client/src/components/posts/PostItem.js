import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div className="card card-body mb-3">
    <div className="row">
      <div className="col-md-2">
        <a href="profile.html">
          <img
            className="rounded-circle d-none d-md-block"
            src={
              avatar
                ? avatar
                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
            }
            alt=""
          />
        </a>
        <br />
        <p className="text-center">{name}</p>
      </div>
      <div className="col-sm-10" style={{ background: "#f2f2f2" }}>
        <p className="lead" style={{ marginTop: "10px" }}>
          {text}
        </p>
        <p className="post-date">
          Posted on{" "}
          <Moment format="YYYY/MM/DD" style={{ color: "teal" }}>
            {date}
          </Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" style={{ color: "grey" }} />
          <span> {likes.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down" style={{ color: "grey" }} />
        </button>
        {!auth.loading && user === auth.user._id && (
          <button
            style={{ marginLeft: "20em" }}
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

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
