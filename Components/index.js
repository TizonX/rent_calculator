import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { URL_DOMAIN, defaultProfile, homeDefault } from "../constant";
import Image from "next/image";
import UserProfileCard from "./UserProfile/UserProfileCard";
import Model from "./Model";
const ComponentIndex = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  //
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");
  const [files, setFiles] = useState(null);
  //
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  const [formData, setFormData] = useState({
    propertyName: "",
    houseNo: "",
    address: "",
    noOfFlore: 1,
  });
  // handle error
  useEffect(() => {
    if (error.status) {
      setTimeout(
        () =>
          setError({
            status: false,
            msg: "",
          }),
        3000
      );
    }
  }, [error.status]);

  useEffect(() => {
    const isTokenPresent = localStorage.getItem("access-token");
    if (!isTokenPresent) {
      router.push("/auth/login");
      return;
    }
    getAllUserHomeAndRoomDetail();
  }, []);
  // API call's
  // get all home & room data
  const getAllUserHomeAndRoomDetail = async () => {
    try {
      const userId = localStorage.getItem("user-id");
      const isTokenPresent = localStorage.getItem("access-token");
      if (userId && userId == "") {
        alert("user id: ", userId);
        return;
      }
      const config = {
        method: "get",
        url: `http://localhost:8080/api/v1/home`,
        headers: { Authorization: `Bearer ${isTokenPresent}` },
      };
      const response = await axios.request(config);
      const data = response.data;
      setPropertyData(data[0]?.homes);
      setUserData(data[0]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const storeSingleHomeData = async (data) => {
    try {
      const isTokenPresent = localStorage.getItem("access-token");
      const config = {
        method: "post",
        url: `http://localhost:8080/api/v1/home/`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${isTokenPresent}`,
        },
        data,
      };

      const res = await axios.request(config);
      if (res) {
        setFormData({
          propertyName: "",
          houseNo: "",
          address: "",
          noOfFlore: 1,
        });
        setLgShow(false);
        getAllUserHomeAndRoomDetail();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // API end
  const handlePhotoSelect = (evt) => {
    setFile(evt.target.files[0]);
  };
  //
  const handlePhotoSelect2 = (evt) => {
    setFiles(evt.target.files);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user-id");
    const formDataObj = new FormData();
    formDataObj.append("propertyName", formData.propertyName);
    formDataObj.append("houseNo", formData.houseNo);
    formDataObj.append("address", formData.address);
    formDataObj.append("noOfFlore", formData.noOfFlore);
    formDataObj.append("owner_Id", userId);

    if (file) {
      formDataObj.append("upload", file);
    }

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("uploadMultiple", files[i]);
      }
    }

    storeSingleHomeData(formDataObj);
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePropertySelect = (param) => {
    router.push(`/property-details/${param}`);
  };
  return (
    <>
      <div className="container mx-auto bg-slate-500 p-4 min-h-screen flex md:flex-row">
        <div className="max-w-full md:max-w-40 basis-1/2 mx-2">
          <div className="shadow-lg rounded-md p-4 bg-slate-200">
            <div className="mx-auto place-content-center">
              <img
                src={defaultProfile}
                alt="User"
                className="h-10 w-10 object-cover rounded-full mx-auto"
              />
            </div>
            <div className="mx-auto">
              <h1 className="text-base font-bold text-center mt-1">
                {userData?.firstName + " " + userData?.lastName}
              </h1>
            </div>
            <div>
              <h3 className="text-center text-sm text-slate-400">
                {userData?.role}
              </h3>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <buttton
              className="text-center text-white bg-blue-400 mx-auto shadow-lg rounded-md py-1 px-2
          hover:bg-white hover:text-black text-xs cursor-pointer w-full"
              onClick={() => setLgShow(true)}
            >
              + Add Home
            </buttton>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 ps-16 h-full">
          {propertyData?.map((count, index) => (
            <div
              className="min-w-0 shadow-lg bg-slate-300 rounded-lg p-2"
              key={index}
              onClick={() => handlePropertySelect(count._id)}
            >
              <div>
                <img
                  src={count.bannerImage}
                  className="h-44 w-full object-cover rounded-md"
                />
              </div>
              <div>
                <h1 className="text-base font-bold text-center mt-1">
                  {count.propertyName}
                </h1>
                <h3 className="text-xs text-center text-slate-500">
                  House No: <b>{count.houseNo}</b>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lgShow && <Model closeModel={setLgShow} />}
    </>
  );
};

export default ComponentIndex;
