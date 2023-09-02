import React, { useEffect, useState } from "react";
import NavigationBar from "./Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "./UserList/UserList";
import axios from "axios";
const ComponentIndex = () => {
  const [renterData, setRenterData] = useState([]);
  useEffect(() => {
    getAllRenter();
  }, []);
  // API call's
  // get list of renters
  const url= "http://localhost:8080/api/v1/renter";
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
  return (
    <>
      <Row>
        <Col>
          <NavigationBar />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <UserList renterData={renterData} />
          </Col>
          <Col lg={8}>2 of 3</Col>
        </Row>
      </Container>
    </>
  );
};

export default ComponentIndex;
