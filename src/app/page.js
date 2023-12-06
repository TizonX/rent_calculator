"use client";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import EntryPoint from "../../Components";

export default function Home() {
  return (
    <ThemeProvider>
      <EntryPoint />
    </ThemeProvider>
  );
}
