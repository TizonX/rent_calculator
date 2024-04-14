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
    <div className="card">
      <div className="image-container">
        <img
          alt="Image"
          src={propertyData?.bannerImage || PropertDefaultImg}
          width="100"
          height="100"
        />
      </div>
      <div className="content">
        <h2 className="title">{propertyData?.propertyName}</h2>
        <p className="date">House No: {propertyData?.houseNo}</p>
        <p className="date">Address: {propertyData?.address}</p>
        <p className="date">No of floors: {propertyData?.noOfFlore}</p>
        {propertyData?.createdDate && (
          <p className="date">
            Property Ready Date: {formatDate(propertyData?.createdDate)}
          </p>
        )}

        <p className="description">
          {propertyData?.desctiption || "No Description Available"}
        </p>
        <div className="buttons">
          <button className="button">Button 1</button>
          <button className="button">Button 2</button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
