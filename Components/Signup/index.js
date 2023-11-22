"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../style/login/login.css";
import axios from "axios";
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
    const apiUrl = `http://15.207.186.147/auth/signup/owner`;
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
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="card card-body">
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_csrf"
                value="7635eb83-1f95-4b32-8788-abec2724a9a4"
              />
              {formArr.map((field, inx) => (
                <div className="form-group required" key={inx}>
                  <label htmlFor="firstName">{field.label}</label>
                  <input
                    type={field.type}
                    className="form-control text-lowercase"
                    id={field.name}
                    required=""
                    name={field.name}
                    value={signupData[field.name]}
                    onChange={handleInputFields}
                  />
                </div>
              ))}
              <div className="form-group pt-3">
                <button
                  className="btn btn-primary btn-block vishal"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="small-xl pt-3 text-center">
              <span className="text-muted">Not a member?</span>
              <Link href="/auth/login">Login</Link>
            </p>
            {errMsg.status && <div className="text-danger">{errMsg.msg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupIndex;
