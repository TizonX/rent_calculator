import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../../style/HomeCard/HomeCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../ReUsableComponents/Loader";
import HomeDefaultImage from "../../asset/image/homeDefault.jpg";
const HomeCard = ({ propertyData, open, close }) => {
  const router = useRouter();
  const handlePropertySelect = (param) => {
    router.push(`/property-details/${param}`);
  };
  return (
    <div class="parentCard">
    <div class="card-container">
      {propertyData.length > 0 ? (
        propertyData.map((count, index) => (
          <div
            class="card"
            key={index}
            onClick={() => handlePropertySelect(count._id)}
          >
            <div class="home-image">
              <img
                src={count.bannerImage}
                width="100"
                height="100"
                alt="Home"
                onerror="(e) => (e.currentTarget.src = HomeDefaultImage)"
              />
            </div>
            <h2>{count.propertyName}</h2>
            <h3>{count.houseNo}</h3>
            <p>{count.address}</p>
          </div>
        ))
      ) : (
        <div class="spinner">
          <Spinner />
        </div>
      )}
    </div>
  
    <div class="add-home" onClick={() => close(!open)}>+ Add New Home</div>
  </div>
  
  );
};

export default HomeCard;
