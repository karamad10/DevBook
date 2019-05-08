import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large " style={{ color: "teal" }}>
        {" "}
        Dashboard{" "}
      </h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user" /> Welcome {user && user.name}{" "}
      </p>
      {profile !== null ? (
        <Fragment> has </Fragment>
      ) : (
        <Fragment>
          <p> You Don't have a profile, please add some information </p>
          <Link
            to="/create-profile"
            className="btn btn-primary"
            style={{ background: "teal", border: "none" }}
          >
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
