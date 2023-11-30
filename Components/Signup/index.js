"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../style/login/login.css";
import axios from "axios";
import { URL_PORT } from "../constant";
const SignupIndex = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState({
    status: false,
    msg: "",
  });
  const formArr = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "email",
      name: "email",
      type: "email",
    },
    {
      label: "phone",
      name: "phone",
      type: "text",
    },
    {
      label: "password",
      name: "password",
      type: "password",
    },
  ];
  //-------------------API START-------------------------
  const signupAPICall = async () => {
    const apiUrl = `${URL_PORT}/auth/signup/owner`;
    axios
      .post(apiUrl, signupData)
      .then((response) => {
        // Handle success
        console.log("Response:", response.data);
        router.push(`/auth/login`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        setErrMsg({
          status: true,
          msg: error.message,
        });
      });
  };
  //--------------------API END--------------------------
  const handleInputFields = (e) => {
    const { name, value } = e.target;
    setSignupData(() => ({
      ...signupData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
    signupAPICall();
  };
  return (
    <div>
        SignUpIndex
        
        <Link href="/auth/login">login</Link>
        </div>
  )
}

export default SignUpIndex