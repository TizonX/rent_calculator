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
    <div className="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error.status && <div>{error.message}</div>}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            value={loginData.email}
            onChange={handleInputFields}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            value={loginData.password}
            onChange={handleInputFields}
          />
        </div>
       
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            href="/signup"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginIndex;
