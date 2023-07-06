"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
const editBlog = async (title: string, body: string, id: string) => {
  const data = await fetch("http://localhost:3000/api/" + id, {
    method: "PUT",
    body: JSON.stringify({ title, body, id }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  if (!data.ok) {
    console.log("err");
  }
};
interface pageProps {
  params: { id: string };
}

const EditBlog: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    toast.loading("Fetching Data 🚀");
    const getData = async () => {
      const data = await fetch("http://localhost:3000/api/" + params.id);
      const res = await data.json();
      if (titleRef.current && descriptionRef.current) {
      titleRef.current.value = res.title;
      descriptionRef.current.value = res.body;
    }
    };
    getData()
    toast.dismiss();
    toast.success("Data fetched Successfully");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀");
      await editBlog(
        titleRef.current.value,
        descriptionRef.current.value,
        params.id
      );
      toast.success("Blog Edited Successfully");
      toast.dismiss();
      router.push("/");
    }
  };
  return (
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">
          Add A Wonderful Blog 🚀
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={titleRef}
            placeholder="Enter Title"
            type="text"
            className="rounded-md px-4 w-full py-2 my-2 "
          />
          <textarea
            ref={descriptionRef}
            placeholder="Enter Description"
            className="rounded-md px-4 py-2 w-full my-2"
          ></textarea>
          <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default EditBlog;
