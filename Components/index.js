import React, { useEffect, useState } from "react";
import NavigationBar from "./Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "./UserList/UserList";
import HomeCard from "./HomeCard/HomeCard";
import UserProfileCard from "./UserProfile/UserProfileCard";
import axios from "axios";
import { Container } from 'react-bootstrap';
import { getPropertyDetailsFakeAPI } from "./FakeAPICalls";
import { useRouter } from 'next/navigation'
const ComponentIndex = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
  })
  // handle error
  useEffect(() => {
    if (error.status) {
      setTimeout(() => setError({
        status: false,
        msg: ""
      }), 3000);
    }
  }, [error.status]);

  useEffect(() => {
    const isTokenPresent = localStorage.getItem("access-token");
    if (!isTokenPresent) {
      router.push("/auth/login")
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
        url: `http://localhost:8002/api/v1/home/${userId}`,
        headers: { 'Authorization': `Bearer ${isTokenPresent}` }
      }
      const response = await axios.request(config);
      const data = response.data;
      setPropertyData(data[0]?.homes);
      setUserData(data[0]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // API end
  return (
    <>
      <Row>
        <Col>
          {/* <NavigationBar /> */}
        </Col>
      </Row>
      <Container>
        <Row>
          <Col lg={2}>
            {/* <UserList renterData={renterData} /> */}
            <UserProfileCard userData={userData} />
          </Col>
          <Col lg={10}>
            <Container>
              <HomeCard propertyData={propertyData} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ComponentIndex;
