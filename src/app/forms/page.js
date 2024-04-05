"use client";
import axios from "axios";
import React, { useState } from "react";
function FileUploadForm() {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleFileChange = (event) => {
    setFileInput(event.target.files[0]);
  };

  const submitForm = async (data) => {
    try {
      console.log("data : ", data);
      const isTokenPresent = localStorage.getItem("access-token");
      const config = {
        method: "post",
        url: `http://localhost:8080/api/v1/form/single`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${isTokenPresent}`,
        },
        data,
      };
      const res = await axios.request(config);
      if (res) {
        setTextInput("");
        setFileInput(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("text", textInput);
    if (fileInput) {
      formDataObj.append("image", fileInput);
    }
    submitForm(formDataObj);
  };

  return (
    <div className="form-container">
      <h2>Form with Text and File Upload Fields</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div>
          <label htmlFor="text_field">Text Field:</label>
          <br />
          <input
            type="text"
            id="text_field"
            name="text_field"
            value={textInput}
            onChange={handleTextChange}
            className="text-field"
          />
        </div>
        <br />
        <div>
          <label htmlFor="upload_image">File Upload:</label>
          <br />
          <input
            type="file"
            id="upload_image"
            name="upload_image"
            onChange={handleFileChange}
            className="file-upload"
          />
        </div>
        <br />
        <div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileUploadForm;
