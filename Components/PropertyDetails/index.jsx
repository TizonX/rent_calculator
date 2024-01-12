"use client";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PropertyInfo from "./PropertyInfo";
import { Modal } from "react-bootstrap";
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
  const amenities = ["Bed", "Fan", "Wardrobe", "Table", "Chair"]
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
        })
        setLgShow(false);
      }

    } catch (error) {
      setError({
        status: true,
        msg: error.response.data.error,
      })
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user-id");
    const formDataObj = new FormData();
    formDataObj.append("flore", formData.flore);
    formDataObj.append("roomNo", formData.roomNo);
    formDataObj.append("roomType", formData.roomType);
    if (file) {
      formDataObj.append("image", file);
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("multiImage", files[i]);
      }
    }
    storeSingleRoomData(formDataObj);
  }
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
  }
  const handleAmenities = (ame) => {
    const copyFacility = [...facility];
    const index = facility.indexOf(ame);
    if (index !== -1) {
      copyFacility.splice(index, 1);
    }
    else {
      copyFacility.push(ame);
    }
    setFacility(copyFacility);
  }
  return (
    <div>
      <Container>
        <PropertyInfo homeId={homeId} openModal={handleModla} />
      </Container>
      {/* insert new room data */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Room details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column"
            method="post"
            enctype="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="upload">single image</label>
            <input
              filename={file}
              type="file"
              id="upload"
              name="upload"
              onChange={handlePhotoSelect}
            />
            <label htmlFor="uploadMultiple">multiple image</label>
            <input
              filename={files}
              type="file"
              id="uploadMultiple"
              name="uploadMultiple"
              multiple
              onChange={handlePhotoSelect2}
            />
            <input
              type="number"
              name="flore"
              placeholder="No of flore"
              value={formData.flore}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="roomNo"
              placeholder="room no"
              value={formData.roomNo}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="roomType"
              placeholder="roomType"
              value={formData.roomType}
              onChange={handleFormData}
            />
            <div className="my-3">
              {
                amenities.map((amenitie, inx) =>
                (
                  <span className={`p-2 m-2 border rounded-2 ${facility.includes(amenitie) ? "active" : ""} `} key={inx}
                    onClick={() => handleAmenities(amenitie)}>{amenitie}</span>
                ))
              }
            </div>
            <button type="submit">Submit</button>
            {error.status && <div>{error.msg}</div>}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
