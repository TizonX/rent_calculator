"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../../style/login/login.css";
const LoginIndex = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
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
                  {/* <Link
                    className="ml-auto border-link small-xl"
                    href="/forget-password"
                  >
                    Forget?
                  </Link> */}
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
              {/* <div className="form-group mt-4 mb-4">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="remember-me"
                    name="remember-me"
                    data-parsley-multiple="remember-me"
                  />
                  <label className="custom-control-label" for="remember-me">
                    Remember me?
                  </label>
                </div>
              </div> */}
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
