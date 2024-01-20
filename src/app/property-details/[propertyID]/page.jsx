"use client";
import React, { useEffect, useState } from "react";
import PropertyDetails from "../../../../Components/PropertyDetails";
import { useParams } from "next/navigation";

const PropertyDetailsPage = () => {
  const params = useParams();
  const [homeId, setHomeId] = useState(null);
  useEffect(() => {
    setHomeId(params.propertyID);
  }, [params.propertyID]);

  return <div>{homeId && <PropertyDetails homeId={homeId} />}</div>;
};

export default PropertyDetailsPage;
