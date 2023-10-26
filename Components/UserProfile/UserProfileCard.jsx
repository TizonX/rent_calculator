import React from 'react';
import "../../style/UserProfileCard/UserProfileCard.css"
const UserProfileCard = () => {
    const defaultProfile = "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
    return (
        <div className="profile-card">
            <div className="profile-image">
                <img src={defaultProfile} alt="User" />
            </div>
            <h2 className="profile-title">Vishal Kumar</h2>
            <p className="profile-info">Software Developer</p>
        </div>
    );
};

export default UserProfileCard;
