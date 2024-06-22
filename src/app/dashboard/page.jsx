"use client"
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import { deleteBlog, fetchAuthorBlogs, submitBlog, truncateText } from '../lib/blogFunctions';

const Dashboard = () => {
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
      setData((prevData)=>({...prevData, title: blogToUpdate.title}));
      setData((prevData)=>({...prevData, desc: blogToUpdate.desc}));
      setUpdatingBlogId(blogId);
    }
  };

  return (
    <div>
      <div className="container-flex grid grid-cols-10">
        <div className="md:col-span-2 bg-blue-200"></div>
        <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
          <Header />

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
            <button
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
            Manage My Blogs
          </button>

          {showButton && (
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authorBlogs.map((authorBlog, index) => (
                  <tr key={authorBlog._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link href={`/blogs/${authorBlog._id}`}>{authorBlog.title}</Link>
                    </td>
                    <td>
                      {truncateText(authorBlog.desc,10)}
                    </td>
                    <td>
                      <button onClick={() => startUpdate(authorBlog._id,setAuthorBlogs)}>Update</button>
                      <button onClick={() => deleteBlog(authorBlog._id,authorBlogs,setAuthorBlogs)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Footer />
        </div>
        <div className="md:col-span-2 bg-blue-200"></div>
      </div>
    </div>
  );
};

export default Dashboard;
