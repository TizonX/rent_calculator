"use client";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import EntryPoint from "../../Components";
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  const isTokenPresent = localStorage.getItem("access-token");

  if (!isTokenPresent) {
    router.push("/auth/login")
  }
  return (
    <ThemeProvider>
      <EntryPoint />
    </ThemeProvider>
  );
}
