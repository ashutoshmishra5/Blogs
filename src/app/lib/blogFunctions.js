// ./lib/func
"use client"

// HomePage Functions
export const fetchAllBlogs = async (setBlogs) => {
    try {
        const response = await fetch('/api/fetchBlogApi');
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        const result = await response.json();
        setBlogs(result);
    } catch (error) {
        alert("Error fetching Blogs");
    }
};

export const truncateText = (text, limit) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
};

export const handleNextPage = (setCurrentPage) => {
    setCurrentPage(prevPage => prevPage + 1);
};

export const handlePrevPage = (setCurrentPage) => {
    setCurrentPage(prevPage => prevPage - 1);
};

// BlogSlug Page 

export const fetchBlogbyId = async (id,blog,setBlog) => {
  try {
      const response = await fetch(`/api/fetchBlogApi`);
      const result = await response.json();
      if (result) {
          const selectedBlog = result.find(blog => blog._id === id);
          setBlog(selectedBlog);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

// Dashboard Page

export const fetchAuthorBlogs = async (author,setAuthorBlogs) => {
    try {
      const response = await fetch(`/api/fetchBlogApi/authorBlogsApi/${author}`);
      const result = await response.json();
      setAuthorBlogs(result);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  export const fetchCategoryBlogs = async (category,setBlogs) => {
    try {
      const response = await fetch(`/api/fetchBlogApi/categoryBlogsApi/${category}`);
      const result = await response.json();
      setBlogs(result);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };




export const deleteBlog = async (id,authorBlogs,setAuthorBlogs) => {
    try {
      const response = await fetch(`/api/fetchBlogApi/deleteBlogs/${id}`, {
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
  
export const submitBlog = async (updatingBlogId,data,setData,setUpdatingBlogId,setAuthorBlogs) => {
  try {
    let url = '/api/addblogApi';
    let method = 'POST';

    if (updatingBlogId) {
      url = `/api/fetchBlogApi/updateBlogs/${updatingBlogId}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data}),
    });

    const results = await response.json();
    if (response.ok) {
      if (updatingBlogId) {
        alert('Blog updated successfully');
      } else {
        alert('Blog created successfully');
      }

      setData((prevData) => ({
        ...prevData,
        title: "",
        desc: "",
        date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
        category: "",
      }));
      setUpdatingBlogId(null);

      fetchAuthorBlogs(data.author, setAuthorBlogs);

    } else {
      alert(`Error ${updatingBlogId ? 'updating' : 'creating'} blog: ${results.error}`);
    }
  } catch (error) {
    alert(`Error ${updatingBlogId ? 'updating' : 'creating'} blog`);
  }
};
  