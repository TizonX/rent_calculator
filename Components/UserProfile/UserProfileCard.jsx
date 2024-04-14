import React from "react";
// import "../../style/UserProfileCard/UserProfileCard.css";
const UserProfileCard = ({ userData }) => {
  
  return (
    <div className="">
      <div className="profile-image">
        
      </div>
      <h2 className="profile-title">
        {userData?.firstName + " " + userData?.lastName}{" "}
      </h2>
      <p className="profile-info">{userData?.role}</p>
    </div>
  );
};

export default UserProfileCard;
