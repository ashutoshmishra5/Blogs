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
        <>
        <Header/>
        <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-1 lg:col-span-2 bg-blue-200"></div>
            <div className="col-span-10 md:col-span-8 lg:col-span-6 bg-blue-200 px-2">
                <div className="container my-2">
                   <div className="flex items-center justify-center space-x-4">
                        <label>category: </label>
                        
                        <button className="block px-2 py-2" type ="button" onClick={() => setCategory("")} >all</button>
                        <button type ="button" onClick={() => setCategory("mobiles")} className={'block px-1 py-1 rounded-2xl overflow-hidden object-cover ' + (category === 'sports' ? 'bg-blue-50' : '')}>Mobiles</button>
                        <button type ="button" onClick={() => setCategory("technology")} className={'block px-1 py-1 rounded-2xl overflow-hidden object-cover ' + (category === 'politics' ? 'bg-blue-50' : '')}>Technology</button>
                        <button type ="button" onClick={() => setCategory("ai")} className={'block px-1 py-1 rounded-2xl overflow-hidden object-cover ' + (category === 'bollywood' ? 'bg-blue-50' : '')}>AI</button>
                    </div>
                    </div>
                <div>
                    {blogsInThisPage.length > 0 ? (
                        <ul>
                            {blogsInThisPage.map((blog) => (
                                <Cards key={blog._id} title={blog.title} author={blog.author} date={blog.date} imgUrl={blog.imgUrl} desc={truncateText(blog.desc, 60)} href={`/blogs/${blog._id}`} />
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <div className="flex justify-center text-xs mt-4">Page : {currentPage}</div>


                    {blogs.length > blogsPerPage && (
                        <div className="flex justify-center">
                            {currentPage > 1 && (
                                <button onClick={() => handlePrevPage(setCurrentPage)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-2xl">
                                    Previous
                                </button>
                            )}
                            {blogsInThisPage.length === blogsPerPage && (
                                <button onClick={() => handleNextPage(setCurrentPage)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-2xl">
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {/*<Footer />*/}

                </div>
            <div className="md:col-span-1 lg:col-span-2 bg-blue-200" ></div>
        </div>

<Footer/>
</>
    );
};

export default Homepage;
// If this page dont fetch, open blog/id page on browser and then return to this page



