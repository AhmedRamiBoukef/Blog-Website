import Button from "../components/button";
import Blog from "../components/Blog";

const getBlogs = async () => {
  const data = await fetch("http://localhost:3000/api/blogs", { cache: 'no-store' });
  if (!data.ok) {
    console.log(data);
  }
  const res = await data.json();
  return res;
};


export default async function Home() {
  
  const data: {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    UpdatedAt: Date;
  }[] = await getBlogs();
  
  return (
    <div className="flex items-center flex-col">
      <div className="bg-slate-800 rounded px-6 py-4 my-6">
        <h1 className="text-slate-200 font-extrabold text-2xl font-[verdana]">
          Full Stack Blog Website
        </h1>
      </div>
      <Button/>
      <div className="my-6 flex flex-col items-center">
        {data &&
          data.map((blog) => (
            <Blog
              key={blog.id}
              id={blog.id}
              title={blog.title}
              body={blog.body}
              createdAt={blog.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
