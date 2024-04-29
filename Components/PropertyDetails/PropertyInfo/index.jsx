import React, { useState, useEffect } from "react";
import "../../../style/PropertyDetails/PropertyInfo.css";
import PropertDefaultImg from "../../../asset/image/homeDefault.jpg";
import Image from "next/image";
import { getSinglePropertyDetailsFakeAPI } from "../../FakeAPICalls";
import SpinnerLoader from "../../ReUsableComponents/Loader";
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
    <div className="flex py-8 px-8 ">
      <div className="border border-solid border-2 border-slate-200 p-4">
        <Image
          alt="Image"
          src={propertyData?.bannerImage || PropertDefaultImg}
          className="block w-30 h-30 w-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="mx-2">
        <h2 className="text-6xl font-bold">{propertyData?.propertyName}</h2>
        <p className="text-sm text-slate-500">
          House No: {propertyData?.houseNo}
        </p>
        <p className="text-lg italic">Address: {propertyData?.address}</p>
        <p className="text-sm text-slate-500">
          No of floors: {propertyData?.noOfFlore}
        </p>
        {propertyData?.createdDate && (
          <p className="text-sm text-slate-500">
            Property Ready Date: {formatDate(propertyData?.createdDate)}
          </p>
        )}

        <p className="text-sm text-slate-500">
          {propertyData?.desctiption || "No Description Available"}
        </p>
        <div className="buttons">
          <button className="bg-red-400 p-4 rounded">Delete</button>
          <button className="bg-green-400 p-4 mx-2 rounded">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
