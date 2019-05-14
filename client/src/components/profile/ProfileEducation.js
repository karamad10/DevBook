import React from "react";
//import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description }
}) => (
  <div className="row">
    <div className="col-md-6">
      <div className="card card-body bg-light mb-3">
        <h3 className="text-dark">{school}</h3>
        <p style={{ color: "teal" }}>
          <Moment format="YYYY/MM/DD">{from}</Moment> -
          {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          <span style={{ color: "teal" }}>{degree}</span>
        </p>
        <p>
          <strong>Field Of study: </strong>
          <span style={{ color: "teal" }}>{fieldofstudy}</span>
        </p>
        <p>
          <strong>Description: </strong>
          <span style={{ color: "teal" }}>{description}</span>
        </p>
      </div>
    </div>
  </div>
);

ProfileEducation.propTypes = {
  //education: PropTypes.array.isRequired
};

export default ProfileEducation;
