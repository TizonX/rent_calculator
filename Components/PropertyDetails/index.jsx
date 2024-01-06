"use client";
import React from "react";
import { Container } from "react-bootstrap";
import PropertyInfo from "./PropertyInfo";
const PropertyDetails = ({ homeId }) => {
  console.log("p2: ", homeId)
  return (
    <div>
      <Container>
        <PropertyInfo homeId={homeId} />
      </Container>
    </div>
  );
};

export default PropertyDetails;
