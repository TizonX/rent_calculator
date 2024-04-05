import React, { useState, useEffect } from "react";
import "../../../style/PropertyDetails/PropertyInfo.css";
import PropertDefaultImg from "../../../asset/image/homeDefault.jpg";
import Image from "next/image";
import { getSinglePropertyDetailsFakeAPI } from "../../FakeAPICalls";
import SpinnerLoader from "../../ReUsableComponents/Loader";
import { Container } from "react-bootstrap";
import HomeCard from "../../HomeCard/HomeCard";
import ListOfRenter from "../ListOfRenter";
import SingleRenterDetails from "../ListOfRenter/SingleRenterDetails";
import axios from "axios";
import { formatDate } from "../../../HelperFunctions";
const MyComponent = ({ homeId, openModal = null }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [roomData, setRoomData] = useState(null);

  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  console.log("room: ", roomData);
  useEffect(() => {
    getSinglePropertyDetails();
  }, []);
  const getSinglePropertyDetails = async () => {
    try {
      const userId = localStorage.getItem("user-id");
      const isTokenPresent = localStorage.getItem("access-token");
      //
      const config = {
        method: "get",
        url: `http://localhost:8080/api/v1/home/${homeId}`,
        headers: {
          Authorization: `Bearer ${isTokenPresent}`,
          "Content-Type": "application/json",
        },
      };
      //
      const res = await axios.request(config);
      if (res) {
        const data = res.data;
        setPropertyData(data);
        setRoomData(data.rooms);
      }
    } catch (error) {
      console.log(error.message);
      setError({
        status: true,
        msg: "Somthing wenths wrong!!!",
      });
    }
  };
  return (
    <div className="container">
      {propertyData ? (
        <div className="d-flex flex-column justify-content-start ">
          <div className="d-flex justify-content-center align-items-center property-card-parent">
            <div className="image">
              <Image
                src={
                  propertyData?.bannerImage
                    ? propertyData?.bannerImage
                    : PropertDefaultImg
                }
                width={100}
                height={100}
                alt="Image"
              />
            </div>
            <div className="content">
              <h1 className="title">{propertyData?.propertyName}</h1>
              <p className="paragraph">
                {propertyData.desctiption || "No Discription Available"}
              </p>
              <h2>House No: {propertyData?.houseNo}</h2>
              <h2>Address: {propertyData?.address}</h2>
              <h2>No of floors: {propertyData?.noOfFlore}</h2>
              {propertyData?.createdDate && (
                <h2>
                  Property Ready Date: {formatDate(propertyData?.createdDate)}
                </h2>
              )}
            </div>
          </div>
          {/* room card */}
          {/* propertyData?.rooms?.map((room, inx) => ( */}
          <div className="d-flex parent-card">
            <div className="card" onClick={openModal}>
              <div className="card-content">+</div>
            </div>
            {roomData?.map((room, inx) => (
              <div className="card" key={inx}>
                <Image
                  src={room.image ? room.image : PropertDefaultImg}
                  alt="Card"
                  className="card-image"
                  width={30}
                  height={30}
                />
                <div className="card-content">
                  <h3 className="name">{room?.roomNo}</h3>
                  <p className="facility">{room?.facility}</p>
                  {room?.roomType && <p className="facility">RoomType: {room?.roomType}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="spinner">
          <SpinnerLoader />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
