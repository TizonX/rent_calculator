"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import "../../style/login/login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "@/app/redux/userDetail";
import { useRouter } from "next/navigation";
import URL_DOMAIN from "../../constant";
useDispatch;
const LoginIndex = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserDetail.userData);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "vishal@kogo.ai",
    password: "12345",
  });
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
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
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/auth/signin/owner`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);
      const res = await axios.request(config);
      if (res) {
        const data = res.data;
        const { token, _id, role } = data;
        localStorage.setItem("access-token", token);
        localStorage.setItem("user-id", _id);
        localStorage.setItem("user-role", role);
        dispatch(addUserDetails(data));
        router.push(`/`);
      }
    } catch (error) {
      console.log("else: ", error);
      setError({
        status: true,
        message: error.message,
      });
    }
  };
  return (
    <div className="w- max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="jon@gmaail.com"
            name="email"
            value={loginData.email}
            onChange={handleInputFields}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border ${
              error.status && "border-red-500"
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            name="password"
            value={loginData.password}
            onChange={handleInputFields}
          />
          {error.status && (
            <p className="text-red-500 text-xs italic">{error.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/auth/signup"
          >
            Sing up?
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default LoginIndex;
