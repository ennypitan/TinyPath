import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen container">
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Website Developed by Ennypitan
      </div>
    </>
  );
};

export default AppLayout;
