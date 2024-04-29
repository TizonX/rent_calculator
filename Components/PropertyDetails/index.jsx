"use client";
import React, { useState } from "react";
import PropertyInfo from "./PropertyInfo";
import axios from "axios";
const PropertyDetails = ({ homeId }) => {
  const [lgShow, setLgShow] = useState(false);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");
  const [files, setFiles] = useState(null);
  const [facility, setFacility] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  const [formData, setFormData] = useState({
    flore: 1,
    roomNo: "",
    roomType: "",
  });
  const amenities = ["Bed", "Fan", "Wardrobe", "Table", "Chair"];
  const storeSingleRoomData = async (data) => {
    try {
      const isTokenPresent = localStorage.getItem("access-token");
      const config = {
        method: "post",
        url: `http://localhost:8080/api/v1/room/${homeId}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${isTokenPresent}`,
        },
        data,
      };
      const res = await axios.request(config);
      if (res) {
        setFormData({
          flore: 1,
          roomNo: "",
          roomType: "",
        });
        setLgShow(false);
      }
    } catch (error) {
      setError({
        status: true,
        msg: error.response.data.error,
      });
      // console.log(error)
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user-id");
    const formDataObj = new FormData();
    formDataObj.append("flore", formData.flore);
    formDataObj.append("roomNo", formData.roomNo);
    formDataObj.append("roomType", formData.roomType);
    formDataObj.append("facility", facility);
    if (file) {
      formDataObj.append("image", file);
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("multiImage", files[i]);
      }
    }
    storeSingleRoomData(formDataObj);
  };
  const handlePhotoSelect = (evt) => {
    setFile(evt.target.files[0]);
  };
  //
  const handlePhotoSelect2 = (evt) => {
    setFiles(evt.target.files);
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleModla = () => {
    setLgShow(!lgShow);
  };
  const handleAmenities = (ame) => {
    const copyFacility = [...facility];
    const index = facility.indexOf(ame);
    if (index !== -1) {
      copyFacility.splice(index, 1);
    } else {
      copyFacility.push(ame);
    }
    setFacility(copyFacility);
  };
  return (
    <div>
      <>
        <PropertyInfo homeId={homeId} openModal={handleModla} />
      </>
      {/* insert new room data */}

    </div>
  );
};

export default PropertyDetails;
