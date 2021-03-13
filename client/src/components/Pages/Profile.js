import React, { Fragment } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <main className="container-fullwidth--muted-light padtop2 padbot2">
        <div className="container">
          <h1>Your Profile</h1>
          <div className="display-flex align-center">
            <img
              className="profile-avatar"
              src={user.picture}
              alt={`profile for ${user.name}`}
            />
            <p className="padleft1">Welcome {user.given_name}</p>
          </div>
        </div>
      </main>
      <div className="container-fullwidth">
        <div className="container">
          <p>Email: {user.email}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
