"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../style/login/login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "@/app/redux/userDetail";
import { useRouter } from "next/navigation";
useDispatch
const LoginIndex = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserDetail.userData);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInputFields = (e) => {
    const { name, value } = e.target;
    setLoginData(() => ({
      ...loginData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = loginData;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8002/auth/signin/owner',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      const res = await axios.request(config);
      if (res) {
        const data = res.data
        const { token } = data;
        localStorage.setItem("access-token", token);
        dispatch(addUserDetails(data));
        router.push(`/`);
      }
    } catch (error) {
      console.log("else: ", error);
    }


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
              <div className="form-group required">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control text-lowercase"
                  id="email"
                  required=""
                  name="email"
                  value={loginData.email}
                  onChange={handleInputFields}
                />
              </div>
              <div className="form-group required">
                <label
                  className="d-flex flex-row align-items-center"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required=""
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputFields}
                />
              </div>
              <div className="form-group pt-3">
                <button
                  className="btn btn-primary btn-block vishal"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="small-xl pt-3 text-center">
              <span className="text-muted">Not a member?</span>
              <Link href="/auth/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIndex;
