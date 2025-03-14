import React from "react";
import UserProtectWrapper from "@/components/wrappers/UserProtectWrapper";

const page = () => {
  return (
    <UserProtectWrapper>
      <div>User UI</div>
    </UserProtectWrapper>
  );
};

export default page;
