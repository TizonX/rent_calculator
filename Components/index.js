import React, { useEffect, useState } from "react";
import NavigationBar from "./Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "./UserList/UserList";
import HomeCard from "./HomeCard/HomeCard";
import UserProfileCard from "./UserProfile/UserProfileCard";
import axios from "axios";
import { Container, Modal } from "react-bootstrap";
import { getPropertyDetailsFakeAPI } from "./FakeAPICalls";
import { useRouter } from "next/navigation";
import { URL_DOMAIN } from "../constant";
const ComponentIndex = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  //
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");
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
        url: `http://localhost:8080/api/v1/home/${userId}`,
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
    setFilename(evt.target.files[0].name);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user-id");
    const obj = {
      ...formData,
      upload: file,
      owner_Id: userId,
    };
    console.log(obj);
    storeSingleHomeData(obj);
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Row>
        <Col>{/* <NavigationBar /> */}</Col>
      </Row>
      <Container>
        <Row>
          <Col lg={2}>
            {/* <UserList renterData={renterData} /> */}
            <UserProfileCard userData={userData} />
          </Col>
          <Col lg={10}>
            <Container>
              <HomeCard
                propertyData={propertyData}
                open={lgShow}
                close={setLgShow}
              />
            </Container>
          </Col>
        </Row>
      </Container>

      {/* insert new property data */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add property details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column"
            method="post"
            enctype="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <input
              filename={file}
              type="file"
              name="upload"
              onChange={handlePhotoSelect}
            />
            <input
              type="text"
              name="propertyName"
              placeholder="property name"
              value={formData.propertyName}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="houseNo"
              placeholder="house no"
              value={formData.houseNo}
              onChange={handleFormData}
            />
            <input
              type="text"
              name="address"
              placeholder="address"
              value={formData.address}
              onChange={handleFormData}
            />
            <input
              type="number"
              name="noOfFlore"
              placeholder="no of flore"
              value={formData.noOfFlore}
              onChange={handleFormData}
            />

            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ComponentIndex;
/*
{
    "bannerImage" : "...",
    "multiImage":[],
    "propertyName":"Vishnu Lok",
    "houseNo":"L/V-0|1",
    "address":"Swarg Lok",
    "noOfFlore":"16",
    "owner_Id":"655b3c6120e98ae3ea42fcc1"
}

*/
