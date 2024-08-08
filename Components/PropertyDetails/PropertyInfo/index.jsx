import React, { useState, useEffect } from "react";
// import "../../../style/PropertyDetails/PropertyInfo.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FACILITY } from "../../../constant";
const MyComponent = ({ homeId, openModal = null, update = null }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [listToggle, setListToggle] = useState(false);
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  useEffect(() => {
    if (update == false) {
      getSinglePropertyDetails();
    }
  }, [update]);
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
  // delete room
  const deleteSingleRoom = async (roomId) => {
    try {
      const userId = localStorage.getItem("user-id");
      const isTokenPresent = localStorage.getItem("access-token");
      //
      const config = {
        method: "delete",
        url: `http://localhost:8080/api/v1/room/${roomId}`,
        headers: {
          Authorization: `Bearer ${isTokenPresent}`,
          "Content-Type": "application/json",
        },
      };
      //
      const res = await axios.request(config);
      if (res) {
        getSinglePropertyDetails();
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
    <>
      {propertyData ? (
        <div className="flex md:flex flex-col lg:flex-row w-full mt-3 bg-slate-100 relative">
          <div className="">
            <Image
              src={
                propertyData?.bannerImage
                  ? propertyData?.bannerImage
                  : PropertDefaultImg
              }
              width={400}
              height={300}
              alt="Image"
              className=" lg:rounded-l-lg"
            />
          </div>
          <div className="flex flex-col mt-3 sm:p-2 md:p-4 lg:px-5 ">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {propertyData?.propertyName}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              House No: {propertyData?.houseNo}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              No of floors: {propertyData?.noOfFlore}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {propertyData.desctiption || "No Discription Available"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Address: {propertyData?.address}
            </p>
            {/* add room btn */}
            <button
              type="button"
              onClick={openModal}
              className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 absolute bottom-4 right-0"
            >
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Add Rooms
            </button>
          </div>
        </div>
      ) : (
        <div className="spinner">
          <SpinnerLoader />
        </div>
      )}
      {/* room list || renter list */}

      <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          onClick={() => setListToggle(false)}
        >
          Rooms
        </button>

        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          onClick={() => setListToggle(true)}
        >
          Renters
        </button>
      </div>

      {listToggle ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4">Gray</td>
                <td className="px-6 py-4">Phone</td>
                <td className="px-6 py-4">$799</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch 5
                </th>
                <td className="px-6 py-4">Red</td>
                <td className="px-6 py-4">Wearables</td>
                <td className="px-6 py-4">$999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <section className="">
          <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
            {roomData?.map((room, index) => (
              <article
                key={index}
                className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
              >
                <Link href="#" className="no-underline text-slate-900">
                  <img
                    src={room.image ? room.image : PropertDefaultImg}
                    className="h-56 w-full object-cover"
                    alt=""
                  />
                  <div className="flex-auto px-6 mt-2">
                    <span className="flex space-x-4">
                      {room?.facility.map((item, index) => (
                        <FontAwesomeIcon
                          icon={FACILITY[item]}
                          key={index}
                          className="text-slate-500"
                        />
                      ))}
                    </span>
                    <h3 className="text-2xl mt-3">{room?.roomNo}</h3>
                    <p className="text-sm font-light text-slate-400">
                      RoomType: {room?.roomType}
                    </p>
                    <div className="flex items-end justify-end py-3">
                      <FontAwesomeIcon
                        icon={faEdit}
                        key={index}
                        className=" px-4 text-green-600"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        key={index}
                        className=" text-red-600"
                        onClick={() => deleteSingleRoom(room._id)}
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MyComponent;
