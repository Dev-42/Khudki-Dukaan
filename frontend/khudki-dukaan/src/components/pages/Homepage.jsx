"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

const Homepage = () => {
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-50 relative"
      >
        <motion.img
          src="/ZippyRideLogo.webp"
          alt="ZippyRide Logo"
          className="h-[100%] md:h-3/4 drop-shadow-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Floating CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-[4rem] md:bottom-12"
        >
          {/* Floating Effect */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {/* Button with Animated Effects */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 3,
                boxShadow: "0px 0px 15px rgba(255, 193, 7, 0.8)",
              }}
              whileTap={{ scale: 0.9, rotate: -2 }}
              className="relative"
            >
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-500 opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />

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
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Homepage;
