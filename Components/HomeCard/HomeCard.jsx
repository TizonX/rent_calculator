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
    <div className="parentCard">
      {propertyData.length > 0 ? (
        propertyData.map((count, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handlePropertySelect(count._id)}
          >
            <div className="home-image">
              {/* <FontAwesomeIcon
              icon={faHouse}
            /> */}
              <Image
                src={count.bannerImage}
                // src={HomeDefaultImage}
                width={100}
                height={100}
                alt="Home"
                onError={(e) => (e.currentTarget.src = HomeDefaultImage)}
              />
            </div>
            <h2>{count.propertyName}</h2>
            <h3>{count.houseNo}</h3>
            <p>{count.address}</p>
          </div>
        ))
      ) : (
        <div className="spinner">
          <Spinner />
        </div>
      )}

      {/* add home */}
      <div onClick={() => close(!open)}>+ Add New Home</div>
    </div>
  );
};

export default HomeCard;
