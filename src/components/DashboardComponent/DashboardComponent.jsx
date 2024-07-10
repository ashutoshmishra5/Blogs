"use client"
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteBlog, fetchAuthorBlogs, submitBlog, truncateText,fetchCategoryBlogs } from '@/app/lib/blogFunctions';

const DashboardComponent = () => {
    
const { data: session, status } = useSession();

const [data,setData] = useState(
  () =>
    {
    const now = new Date();
    return {
    title : "",
    desc : "",
    author : "",
    date : `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`,
    imgUrl : "",
    category : "",
  }}
);

const [authorBlogs, setAuthorBlogs] = useState([]);
const [updatingBlogId, setUpdatingBlogId] = useState(null); 
const [showButton, setShowButton] = useState(false);

useEffect(() => {
  if (session?.user?.name) {
     setData((prevData) => ({...prevData, author: session?.user.name}));
  }
}, [session]);


useEffect(() => {
  if (data.author) {
    fetchAuthorBlogs(data.author,setAuthorBlogs);
  }
},[data.author]);


const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const { selectionStart, selectionEnd } = event.target;
    const newDesc = data.desc.substring(0, selectionStart) + '\n' + data.desc.substring(selectionEnd);
    setData((prevData) =>({...prevData, desc: newDesc}));
    event.target.selectionStart = event.target.selectionEnd = selectionStart + 1;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  submitBlog(updatingBlogId,data,setData,setUpdatingBlogId,setAuthorBlogs);
};

const startUpdate = (blogId) => {
  const blogToUpdate = authorBlogs.find((blog) => blog._id === blogId);
  if (blogToUpdate) {
    setData( (prevData)=>
      ({...prevData, 
      title: blogToUpdate.title, 
      desc: blogToUpdate.desc, 
      imgUrl: blogToUpdate.imgUrl, 
      category: blogToUpdate.category })
    );
    setUpdatingBlogId(blogId);
  }
};

const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);

const handleFileImgChange = (e) => {
  setFile(e.target.files[0]);
  setUploading(true);
};

const handleImgSubmit = async (e) => {
  e.preventDefault();
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch("/api/addblogApi/addImgApi", {
      method: "POST",
      body: formData,
    });

    const imgData = await response.json();
    data.imgUrl = imgData.fileName;
    if (imgData) {
      setUploading(false);
    } else {
      setUploading(false);
    }
  } catch (error) {
    console.log(error);
    setUploading(false);
  }
}


  return (
    <div>
      
      <div className="flex justify-center text-2xl mt-4">Publish your passions, your way</div>
          <div className="flex justify-center text-lg">Create a unique and beautiful blog easily.</div>

          <form onSubmit={handleImgSubmit} className="flex flex-col justify-center items-center mt-4">
          <div className="flex justify-center text-md mb-4">Upload Main Image for your Blog</div>
            <div>
              <input type="file" accept="image/*" onChange={handleFileImgChange} />
              <button type="submit" className="items-center justify-center bg-slate-500 text-white px-4 py-2 rounded">
              Upload
              </button>
            </div>
            <h1>{file?(uploading?"Image is uploading":"Image uploaded, Complete title and description"):""}</h1>
          </form>

          <form onSubmit={handleSubmit}>
            <input
              className="container flex flex-row items-center justify-center mt-8"
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({...data, title: e.target.value})}
              required
            />
            <textarea
              className="container flex flex-row items-center justify-center mt-8"
              placeholder="Description"
              value={data.desc}
              onChange={(e) => setData({...data, desc: e.target.value})}
              onKeyDown={handleKeyPress}
              required
            />
            <div className='container flex flex-row mt-8'>
              <label for="category">Choose a Category: </label>
              <select
              className="items-center justify-center ml-2"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="bollywood">Bollywood</option>
              </select>

            </div>
            

            <button disabled={uploading || (!file && !updatingBlogId)}
              className="container flex flex-row items-center justify-center mt-8 ml-auto bg-slate-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              {updatingBlogId ? 'Update Blog' : 'Post Blog'}
            </button>
          </form>

          <button
            className="container flex flex-row items-center justify-center mt-8 ml-auto bg-slate-500 text-white px-4 py-2 rounded"
            onClick={() => setShowButton(!showButton)}
          >
            Manage Your Blogs
          </button>

          {showButton && (
            <table className=" min-w-full mt-4 bg-slate-50">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Index</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Desc</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {authorBlogs.map((authorBlog, index) => (
                  <tr key={authorBlog._id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">
                      <Link href={`/blogs/${authorBlog._id}`}>{authorBlog.title}</Link>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {truncateText(authorBlog.desc,10)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => startUpdate(authorBlog._id,setAuthorBlogs)}>Update</button>
                      <button onClick={() => deleteBlog(authorBlog._id,authorBlogs,setAuthorBlogs)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

    </div>
  );
};

export default DashboardComponent;