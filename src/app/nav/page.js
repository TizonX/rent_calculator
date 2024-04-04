import React from "react";
import Link from "next/link";
import styles from "../../../style/nav/navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            My Home
          </Link>
        </li>
        <li>
          <Link href="/todo">
            Todo
          </Link>
        </li>
        <li>
          <Link href="/forms">
            Forms
          </Link>
        </li>
        <li>
          <Link href="/forms/single-form-data">
            Single Form Data
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
