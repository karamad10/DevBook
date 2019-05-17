import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Add New Post...</div>
        <div className="card-body">
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({ text });
              setText("");
            }}
          >
            <div className="form-group">
              <textarea
                className="form-control form-control-lg"
                placeholder="Create a post"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
