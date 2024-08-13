import { UrlState } from "@/context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const RequiredAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (isAuthenticated) {
    return children;
  }

  return null; // Optional: Fallback UI if neither condition is met
};
