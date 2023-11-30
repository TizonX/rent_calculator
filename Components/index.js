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
  const [renterData, setRenterData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
  })
  useEffect(() => {
    // getAllRenter();
    const isTokenPresent = localStorage.getItem("access-token");
    if (!isTokenPresent) {
      router.push("/auth/login")
      return;
    }
    getPropertyDetails();
  }, []);
  // API call's
  // get list of renters
  const url = "http://localhost:8080/api/v1/renter";
  const getAllRenter = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("Data received:", data);
      setRenterData(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // API end

  // dummy API's

  // get property details
  const getPropertyDetails = async () => {
    try {
      const res = await getPropertyDetailsFakeAPI();
      if (res) {
        const data = res.data;
        setPropertyData(data);
      }
    } catch (error) {
      setError({
        status: true,
        msg: "Somthing wenths wrong!!!"
      })
    }
  }
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
            <UserProfileCard />
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
