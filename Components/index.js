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
  const [error, setError] = useState({
    status: false,
    msg: "",
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

  // API end
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
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  );
};

export default ComponentIndex;
