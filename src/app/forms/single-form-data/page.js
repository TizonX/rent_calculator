"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const SingleFormData = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    getAllSingleFormData();
  }, []);

  const getAllSingleFormData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/form/all-single-images`
      );
      if (res) {
        console.log(res);
        setApiData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const downloadImage = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:8080/${filename}`, {
        responseType: "blob", // Set response type to blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  return (
    <>
      {apiData?.map((data, inx) => (
        <div className="card" key={inx}>
          <Image
            src={`http://localhost:8080/${data?.image}`}
            alt="Card"
            className="card-image"
          />
          <h2 className="card-title">{data.text}</h2>
          <button
            onClick={() => downloadImage(data?.image)}
            className="download-btn "
          >
            Download Image
          </button>
        </div>
      ))}
    </>
  );
};

export default SingleFormData;
