import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-in fo text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-5 m-auto">
              <img className="rounded-circle" src={avatar} alt="" />
              <h1 className="display-4 text-center" style={{ color: "teal" }}>
                {name}
              </h1>
              <p className="lead text-center" style={{ color: "black" }}>
                {status} {company && <span>at {company}</span>}
              </p>
              <p>
                {location && (
                  <span
                    className="text-center"
                    style={{ color: "black", marginLeft: "82px" }}
                  >
                    {location}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-center">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
