"use client";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Image from "next/image";
import EntryPoint from "../../Components";

export default function Home() {
  return (
    <ThemeProvider>
      <EntryPoint />
    </ThemeProvider>
  );
}
