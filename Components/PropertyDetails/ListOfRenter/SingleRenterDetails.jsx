import React from 'react';
import '../../../style/SingleRenterDetails.css'; // Import your CSS file

const RectangleCard = ({ title, dob, startDate, endDate, imageUrl }) => {
    return (
        <div className="rectangle-card">
            <div className="image">
                <img src={imageUrl} alt="Profile" />
            </div>
            <div className="content">
                <h2>{title}</h2>
                <p>Date of Birth: {dob}</p>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
            </div>
        </div>
    );
};

export default RectangleCard;
