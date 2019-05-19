import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Add a Comment </div>
        <div className="card-body">
          <form
            onSubmit={e => {
              e.preventDefault();
              addComment(postId, { text });
              setText("");
            }}
          >
            <div className="form-group">
              <textarea
                className="form-control form-control-lg"
                placeholder="Add a Comment"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
