import React from 'react';
import "../../../style/PropertyDetails/PropertyInfo.css"
const MyComponent = () => {
  const defaultHomeImg = "https://newhomelistingservice.com/assets/default_logo/large_square_emg_default-04cb60da994cb5a009f5f7640a7881a7b035e7bddba555c218b5e084b2a64f93.jpg";

  return (
    <div className="container">
      <div className="image">
        <img src={defaultHomeImg} alt="Image" />
      </div>
      <div className="content">
        <h1 className="title">Title</h1>
        <p className="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget tortor ac libero
          tristique ullamcorper. Suspendisse potenti.
        </p>
      </div>
    </div>
  );
};

export default MyComponent;
