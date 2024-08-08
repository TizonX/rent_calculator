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
    facility.forEach((item, index) => {
      formDataObj.append(`facility[${index}]`, item);
    });
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
      <Container>
        <PropertyInfo homeId={homeId} openModal={handleModla} update={lgShow} />
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
            className="space-y-6 bg-white p-6 rounded-lg shadow-md"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label
                htmlFor="upload"
                className="block text-sm font-medium text-gray-700"
              >
                Single Image
              </label>
              <input
                filename={file}
                type="file"
                id="upload"
                name="upload"
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handlePhotoSelect}
              />
            </div>

            <div>
              <label
                htmlFor="uploadMultiple"
                className="block text-sm font-medium text-gray-700"
              >
                Multiple Images
              </label>
              <input
                filename={files}
                type="file"
                id="uploadMultiple"
                name="uploadMultiple"
                multiple
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handlePhotoSelect2}
              />
            </div>

            <div>
              <input
                type="number"
                name="flore"
                placeholder="No. of Floors"
                value={formData.flore}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleFormData}
              />
            </div>

            <div>
              <input
                type="text"
                name="roomNo"
                placeholder="Room No"
                value={formData.roomNo}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleFormData}
              />
            </div>

            <div>
              <input
                type="text"
                name="roomType"
                placeholder="Room Type"
                value={formData.roomType}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleFormData}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenitie, inx) => (
                  <span
                    className={`cursor-pointer px-4 py-2 border rounded-lg ${
                      facility.includes(amenitie)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                    key={inx}
                    onClick={() => handleAmenities(amenitie)}
                  >
                    {amenitie}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Submit
              </button>
            </div>

            {error.status && (
              <div className="mt-4 text-sm text-red-600">{error.msg}</div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
