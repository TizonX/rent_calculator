"use client";
import React, { useEffect, useState } from "react";
import "../../style/authLayout/auth-layout.css"



const AuthLayout = ({ children }) => {
  return (
    <div>
      <header>
        
      </header>

      <main>{children}</main>
      <footer>{/* Your footer content goes here */}</footer>
    </div>
  );
};

export default AuthLayout;
