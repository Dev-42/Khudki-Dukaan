"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@mui/material/Button";

const Homepage = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("clicked");
    router.push("/user/login"); // Client-side navigation
  };

  return (
    <div
      className="relative h-screen w-full flex flex-col text-white overflow-hidden"
      style={{
        backgroundImage: `url('/ZippyRideBackground.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo Section */}
      <div className="h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-50 relative">
        <img
          src="/ZippyRideLogo.webp"
          alt="ZippyRide Logo"
          className="h-[100%] md:h-3/4 drop-shadow-lg"
        />

        {/* CTA Button */}
        <div className="absolute bottom-[4rem] md:bottom-12">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FFC107",
              color: "#000",
              fontSize: "1.2rem",
              padding: "12px 24px",
              fontWeight: "bold",
              borderRadius: "50px",
              "&:hover": { bgcolor: "#FFB300" },
            }}
            onClick={handleClick}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
