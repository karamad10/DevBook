import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    skills,
    location
  }
}) => {
  return (
    <div className="card card-body bg-light mb-3">
      <div className="col-lg-12 col-md-4 col-8" style={{ textAlign: "center" }}>
        <img
          className="rounded-circle d-none d-md-block"
          src={avatar}
          alt=""
          style={{ width: "140px", margin: "auto" }}
        />
        <br />
        <h2 style={{ color: "teal" }}>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
      </div>
      <Link
        to={`/profile/${_id}`}
        className="btn btn-dark"
        style={{ width: "200px", margin: "auto" }}
      >
        View Profile
      </Link>
      <br />
      <div className="col-lg-12 col-md-4 col-8">
        <ul className="list-group">
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="list-group-item">
              <i className="fas fa-check pr-1" /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
