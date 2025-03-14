"use client";
import React, { useEffect } from "react";
import { UserDataContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  return <>{children}</>;
};

export default UserProtectWrapper;
