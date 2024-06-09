"use client";
import EntryPoint from "../../Components";

import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../Components/ProtectedRoute";

export default function Home() {
  const protectedRoutes = ["/protected"];
  return (
      <EntryPoint />
  );
}
