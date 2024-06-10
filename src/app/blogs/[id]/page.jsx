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
    const paragraphs = blog.desc.split('\n');

    return (
        <div>
            

            <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                    <Header/>
                    
                    <div className='text-xl py-4 px-4 bg-slate-50 font-semibold'>{blog.title}</div>
                    <div className='text-md py-4 px-4 bg-slate-50 text-justify'>{paragraphs.map((paragraph,index)=>(<p key = {index} className={paragraph.length<40?'font-semibold my-4':''}>{paragraph}</p>))}</div>

                    <Footer/>

                </div>
            <div className="md:col-span-2 bg-blue-200"></div>
      
            </div>
        </div>
    );
};

export default BlogPage;
