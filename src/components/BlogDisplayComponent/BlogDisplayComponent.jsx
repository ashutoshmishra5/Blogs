'use client';
import { fetchBlogbyId } from "@/app/lib/blogFunctions";
import { useEffect, useState } from 'react';
import Image from "next/image";


const BlogDisplayComponent = ({ id }) => {
    const [blog, setBlog] = useState(null);


    useEffect(() => {
        if (id) {
            fetchBlogbyId(id,blog,setBlog);
        }
    }, [fetchCommentbyId]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const paragraphs = blog.desc.split('\n');

    return (
        <div>
                                
            <div className='text-xl py-4 px-4 bg-slate-50 font-semibold'>{blog.title}</div>

            <div className="container mx-auto">
                <div className="flex bg-slate-50">
                    <div className='text-xs pl-4'>Written By <span className="font-medium">{blog.author}</span></div>
                    <div className='text-xs pl-1'>| Updated: {blog.date}</div>
                </div>
            </div>

            <div className="flex justify-center py-4 px-4 bg-slate-50">
                <Image className="object-cover" src={blog.imgUrl} height={1000} width={1000} alt=""/>
            </div>

            <div className='text-md py-4 px-4 bg-slate-50 text-justify'>{paragraphs.map((paragraph,index)=>(<p key = {index} className={paragraph.length<40?'font-semibold my-4':''}>{paragraph}</p>))}</div>

        </div>
    );
};

export default BlogDisplayComponent;
