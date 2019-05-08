import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  return (
    <Fragment>
      <h1 className="display-4 text-center">Create Your Profile</h1>
      <p className="lead text-center">
        Let's get some information to make your profile stand out
      </p>
      <small className="d-block pb-3">* = required field</small>
      <form action="add-experience.html">
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="* Profile handle"
            name="handle"
            required
          />
          <small className="form-text text-muted">
            A unique handle for your profile URL. Your full name, company name,
            nickname, etc (This CAN'T be changed later)
          </small>
        </div>
        <div className="form-group">
          <select
            value={status}
            onChange={e => onChange(e)}
            className="form-control form-control-lg"
            name="status"
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text text-muted">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            City & state suggested (eg. Amsterdam, NL)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            className="form-control form-control-lg"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text text-muted">
            Tell us a little about yourself
          </small>
        </div>

        <div className="mb-3">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span className="text-muted">Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fab fa-twitter fa-2x" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Twitter Profile URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fab fa-facebook fa-2x" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Facebook Page URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fab fa-linkedin fa-2x" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Linkedin Profile URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fab fa-instagram fa-2x" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Instagram Page URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fab fa-youtube fa-2x" />
                </span>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="YouTube Channel URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
