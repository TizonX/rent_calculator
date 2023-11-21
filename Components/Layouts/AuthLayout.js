"use client"
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { getPropertyDetailsFakeAPI } from '../FakeAPICalls';
import { useSelector, useDispatch } from 'react-redux';
import { addProperty } from '@/app/redux/propertyData';
const AuthLayout = ({ children }) => {
  const state = useSelector((state) => state.propertyDetails.property);
  const dispatch = useDispatch();
  const [renterData, setRenterData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [error, setError] = useState({
    status: false,
    msg: "",
  })

  useEffect(() => {
    // getAllRenter();
    console.log("state >>", state);
    if (state.length === 0) {
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
        dispatch({ type: addProperty, payload: data });
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
        {state.length > 0 ?

          state.map((count, index) => (
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
