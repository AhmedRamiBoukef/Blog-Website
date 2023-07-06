"use client"
import { useRouter } from "next/navigation";
import { FC } from "react";

interface buttonProps {}

const Button: FC<buttonProps> = ({}) => {
  const router = useRouter();
  const handleClick = async () => {
    router.push("/blog/add");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-slate-200 text-slate-800 rounded px-6 py-4"
    >
      Add New Blog 🚀
    </button>
  );
};

export default Button;
