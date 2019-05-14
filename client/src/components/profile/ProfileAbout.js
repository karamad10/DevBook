import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-light mb-3">
        {bio && (
          <Fragment>
            <h3 className="text-center text-info">
              {name.trim().split(" ")[0]}'s Bio
            </h3>
            <p className="lead">{bio}</p>
            <hr />
          </Fragment>
        )}

        <h3 className="text-center text-info">Skill Set</h3>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fa fa-check" /> {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
