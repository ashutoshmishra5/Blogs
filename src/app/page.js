'use client';
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from 'react';
import { fetchAllBlogs, handleNextPage, handlePrevPage, truncateText } from "./lib/blogFunctions";

const Homepage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5; // Number of blogs to display per 
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const blogsInThisPage = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    useEffect(() => {
        fetchAllBlogs(setBlogs);
    }, []);

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
                                <button onClick={() => handlePrevPage(setCurrentPage)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                    Previous
                                </button>
                            )}
                            {blogsInThisPage.length === blogsPerPage && (
                                <button onClick={() => handleNextPage(setCurrentPage)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
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
