"use client";
import { BeatLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BeatLoader color="#FF6B00" size={30} />
    </div>
  );
};

export default Loading;
