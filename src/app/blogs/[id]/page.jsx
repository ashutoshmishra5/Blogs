'use client';
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from 'react';

const BlogPage = ({ params }) => {
    const { id } = params;
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogApi`);
                const result = await response.json();
                console.log(result);
                if (result.result) {
                    // Find the blog with _id
                    const selectedBlog = result.result.find(blog => blog._id === id);
                    setBlog(selectedBlog);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            

            <div className="container-flex grid grid-cols-10">
            <div className="col-span-2 bg-blue-200"></div>
                <div className="col-span-6 bg-blue-200">
                    <Header/>
                    
                    <div className='text-2xl py-4 px-4 bg-slate-50'>{blog.title}</div>
                    <div className='text-lg py-4 px-4 bg-slate-50 text-justify'>{blog.desc}</div>

                    <Footer/>

                </div>
            <div className="col-span-2 bg-blue-200"></div>
      
            </div>
        </div>
    );
};

export default BlogPage;
