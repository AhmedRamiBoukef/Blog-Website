"use client";
import { redirect, useRouter } from "next/navigation";
import { FC } from "react";
import { Toaster, toast } from "react-hot-toast";

const deleteBlog = async (id: string) => {
  
  const data = await fetch("http://127.0.0.1:3000/api/" + id, {
    method: "DELETE",
  });
  console.log(data);
  
  if (!data.ok) {
    console.log("err");
  }
};

interface blogProps {
  id: string;
  title: String;
  body: String;
  createdAt: Date;
}

const Blog: FC<blogProps> = ({ id, title, body, createdAt }) => {
  const router = useRouter();
  const handleEdit = async () => {
    router.push("/blog/edit/" + id);
  };
  const handleDelete = async () => {
    toast.loading("Sending Request 🚀");
    await deleteBlog(id);
    toast.dismiss();
    router.refresh();
    toast.success("Blog Deleted Successfully");
  };
  return (
    <div className="bg-slate-200 text-slate-800 rounded text-sm px-2 py-4 w-3/4 mt-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        <div>
          <button
            onClick={handleEdit}
            className="px-4 py-1 mr-4  text-center bg-slate-900 rounded-md font-semibold text-slate-200"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-1  text-center bg-red-700 rounded-md font-semibold text-slate-200"
          >
            Delete
          </button>
        </div>
      </div>
      <h2 className="text-slate-700 font-bold py-2">
        {new Date(createdAt).toDateString()}
      </h2>
      <p>{body}</p>
    </div>
  );
};

export default Blog;
