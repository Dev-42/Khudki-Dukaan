import React from "react";
import UserProtectWrapper from "@/components/wrappers/UserProtectWrapper";
import UserLogout from "@/components/pages/UserLogout";

const page = () => {
  return (
    <UserProtectWrapper>
      <UserLogout />
    </UserProtectWrapper>
  );
};

export default page;
