"use client"
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { getPropertyDetailsFakeAPI } from '../FakeAPICalls'; 
const AuthLayout = ({ children }) => {
    const [renterData, setRenterData] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [error, setError] = useState({
      status: false,
      msg: "",
    })

    useEffect(() => {
        // getAllRenter();
        if(propertyData.length ===0)
        {
        getPropertyDetails();
        }
      }, []);

        // get property details
  const getPropertyDetails = async () => {
    try {
      const res = await getPropertyDetailsFakeAPI();
      if (res) {
        const data = res.data;
        setPropertyData(data);
        console.log(data)
      }
    } catch (error) {
      setError({
        status: true,
        msg: "Somthing wenths wrong!!!"
      })
    }
  }
  return (
    <div>
      <Head>
        <title>Your App Title</title>
        {/* Add any other meta tags, stylesheets, or scripts you want to include */}
      </Head>
      <header>
        {/* Your header content goes here */}
      </header>
      <main>
      {propertyData.length > 0 ?

propertyData.map((count, index) => (
  <div className='card' key={index} onClick={() => handlePropertySelect(count.id)}>
    <div className='home-image'>
      {/* <FontAwesomeIcon
      icon={faHouse}
    /> */}
      {/* <Image src={HomeDefaultImage} alt="Home" /> */}
    </div>
    <h2>{count.name}</h2>
  </div>
))
:
<div className='spinner'>
  {/* <Spinner /> */}
</div>
}
        {children}
      </main>
      <footer>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default AuthLayout;
