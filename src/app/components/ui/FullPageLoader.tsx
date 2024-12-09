import React from "react";
import { Spinner } from "./Spinner";

const FullPageLoader: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen"
      style={{
        backgroundColor: "0a0a0a",
      }}
    >
      <Spinner color="#6b71fd" height="48px" />
    </div>
  );
};

export default FullPageLoader;
