"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserLogout = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("userToken");
          router.push("/");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, [router]);

  return <div>Logout Page</div>;
};

export default UserLogout;
