import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large " style={{ color: "teal", textAlign: "center" }}>
        Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <small className="d-block pb-3">* = required field</small>
              <form
                className="form"
                onSubmit={e => {
                  e.preventDefault();
                  addEducation(formData, history);
                }}
              >
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="* School"
                    name="school"
                    value={school}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={degree}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Field Of Study"
                    name="fieldofstudy"
                    value={fieldofstudy}
                    onChange={e => onChange(e)}
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="from"
                    value={from}
                    onChange={e => onChange(e)}
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="to"
                    value={to}
                    onChange={e => onChange(e)}
                    disabled={toDateDisabled ? "disabled" : ""}
                  />
                </div>

                <div className="form-check mb-4">
                  <p>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      checked={current}
                      value={current}
                      onChange={e => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                      }}
                    />{" "}
                    Current School
                  </p>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description}
                    onChange={e => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
                  </small>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary my-1"
                  style={{ background: "teal", border: "none" }}
                />
                <a className="btn btn-light my-1" href="/dashboard">
                  Go Back
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
