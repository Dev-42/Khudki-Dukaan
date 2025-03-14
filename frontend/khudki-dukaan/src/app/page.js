import React from "react";
import Homepage from "@/components/pages/Homepage";
import UserProtectWrapper from "@/components/wrappers/UserProtectWrapper";
export default function Home() {
  return (
    <div>
      <UserProtectWrapper>
        <Homepage />
      </UserProtectWrapper>
    </div>
  );
}
