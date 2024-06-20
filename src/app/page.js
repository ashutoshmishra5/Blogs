'use client';
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from 'react';

const Homepage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5; // Number of blogs to display per page

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogApi');
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const result = await response.json();
            setBlogs(result);
        } catch (error) {
            alert("Error fetching Blogs");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const blogsInThisPage = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // function to handle prev and next buttons
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
            <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                <Header />
                <div>
                    {blogsInThisPage.length > 0 ? (
                        <ul>
                            {blogsInThisPage.map((blog) => (
                                <Cards key={blog._id} title={blog.title} author={blog.author} date={blog.date} desc={truncateText(blog.desc, 60)} href={`/blogs/${blog._id}`} />
                            ))}
                        </ul>
                    ) : (
                        <p>No blogs available</p>
                    )}

                    <div className="flex justify-center text-xs mt-4">Page : {currentPage}</div>


                    {blogs.length > blogsPerPage && (
                        <div className="flex justify-center">
                            {currentPage > 1 && (
                                <button onClick={prevPage} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                    Previous
                                </button>
                            )}
                            {blogsInThisPage.length === blogsPerPage && (
                                <button onClick={nextPage} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
            <div className="md:col-span-2 bg-blue-200"></div>
        </div>
    );
};

export default Homepage;
