import React, { useState, useEffect } from 'react';
import "../../../style/PropertyDetails/PropertyInfo.css"
import PropertDefaultImg from "../../../asset/image/homeDefault.jpg"
import Image from 'next/image';
import { getSinglePropertyDetailsFakeAPI } from "../../FakeAPICalls";
import SpinnerLoader from '../../ReUsableComponents/Loader';
import { Container } from 'react-bootstrap';
import HomeCard from '../../HomeCard/HomeCard';
import ListOfRenter from '../ListOfRenter';
import SingleRenterDetails from "../ListOfRenter/SingleRenterDetails";
const MyComponent = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState({
    status: false,
    msg: "",
  })

  useEffect(() => {
    getSinglePropertyDetails();
  }, []);
  const getSinglePropertyDetails = async () => {
    try {
      const res = await getSinglePropertyDetailsFakeAPI();
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
    <div className="container">
      {propertyData ? <div className='d-flex flex-column'>
        <div className='d-flex justify-content-center align-items-center'>
          <div className="image">
            <Image src={PropertDefaultImg} alt="Image" />
          </div>
          <div className="content">
            <h1 className="title">{propertyData.name}</h1>
            <p className="paragraph">
              {propertyData.desctiption}
            </p>
          </div>
        </div>
        <div>
          <Container>
            <div className='d-flex justify-content-between w-75'>
              <div>
                <ListOfRenter />
              </div>
              <div>
                <SingleRenterDetails
                  title="John Doe"
                  dob="January 1, 1980"
                  startDate="March 1, 2020"
                  endDate="December 31, 2022"
                  imageUrl="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
        :
        <div className='spinner'>
          <SpinnerLoader />
        </div>
      }
    </div>
  );
};

export default MyComponent;
