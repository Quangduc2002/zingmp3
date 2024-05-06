import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="w-max m-auto">
      <RotatingLines
        visible={true}
        width="50"
        strokeColor="#9b4de0"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loading;
