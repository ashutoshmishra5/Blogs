'use client';
import { connectDb1,disconnectDb1 } from "@/app/lib/utils";

import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from 'react';
import { fetchAllBlogs, handleNextPage, handlePrevPage, truncateText,fetchCategoryBlogs } from "./lib/blogFunctions";

const Homepage = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5; // Number of blogs to display per 
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const blogsInThisPage = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    useEffect(() => {
        if(category==="undefined"||category==="") {
        fetchAllBlogs(setBlogs);
        }else {
        fetchCategoryBlogs(category,setBlogs);
        }
    }, [category]);

    return (
        <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
            <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                <Header />
                <div className="container mx-auto">
                   <ul className="flex items-center justify-center space-x-4">
                        <label>category: </label>
                        
                        <button type ="button" onClick={() => setCategory("")} >all</button>
                        <button type ="button" onClick={() => setCategory("sports")} className={'rounded-md overflow-hidden object-cover ' + (category === 'sports' ? 'bg-blue-50' : '')}>sports</button>
                        <button type ="button" onClick={() => setCategory("politics")} className={'rounded-md overflow-hidden object-cover ' + (category === 'politics' ? 'bg-blue-50' : '')}>politics</button>
                        <button type ="button" onClick={() => setCategory("bollywood")} className={'rounded-md overflow-hidden object-cover ' + (category === 'bollywood' ? 'bg-blue-50' : '')}>bollywood</button>
                    </ul>
                    </div>
                <div>
                    {blogsInThisPage.length > 0 ? (
                        <ul>
                            {blogsInThisPage.map((blog) => (
                                <Cards key={blog._id} title={blog.title} author={blog.author} date={blog.date} imgUrl={blog.imgUrl} desc={truncateText(blog.desc, 60)} href={`/blogs/${blog._id}`} />
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
            <div className="md:col-span-2 bg-blue-200" ></div>
        </div>
    );
};

export default Homepage;
