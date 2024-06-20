"use client"
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(() => {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  });

  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [updatingBlogId, setUpdatingBlogId] = useState(null); 

  useEffect(() => {
    if (session?.user?.name) {
      setAuthor(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (author) {
      fetchBlogs();
    }
  }, [author]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`/api/blogApi/authorBlogsApi/${author}`);
      const result = await response.json();
      setAuthorBlogs(result);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const newDesc = desc.substring(0, selectionStart) + '\n' + desc.substring(selectionEnd);
      setDesc(newDesc);
      event.target.selectionStart = event.target.selectionEnd = selectionStart + 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '/api/addblogApi';
      let method = 'POST';

      if (updatingBlogId) {
        url = `/api/blogApi/updateBlogs/${updatingBlogId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc,
          date,
          author,
        }),
      });

      const results = await response.json();
      if (response.ok) {
        if (updatingBlogId) {
          alert('Blog updated successfully');
        } else {
          alert('Blog created successfully');
        }

        setTitle('');
        setDesc('');
        setDate(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`);
        setUpdatingBlogId(null);

        fetchBlogs();
      } else {
        alert(`Error ${updatingBlogId ? 'updating' : 'creating'} blog: ${results.error}`);
      }
    } catch (error) {
      alert(`Error ${updatingBlogId ? 'updating' : 'creating'} blog`);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`/api/blogApi/deleteBlogs/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result) {
        setAuthorBlogs(authorBlogs.filter((blog) => blog._id !== id)); //?
        alert('Blog deleted successfully');
      } else {
        alert('Error deleting blog: ');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  const startUpdate = (blogId) => {
    const blogToUpdate = authorBlogs.find((blog) => blog._id === blogId);
    if (blogToUpdate) {
      setTitle(blogToUpdate.title);
      setDesc(blogToUpdate.desc);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="container flex flex-row items-center justify-center mt-8"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
                      <button onClick={() => startUpdate(authorBlog._id)}>Update</button>
                      <button onClick={() => deleteBlog(authorBlog._id)}>Delete</button>
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
