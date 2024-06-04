/*
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function testpage() {
    return (
        <div className="container-flex grid grid-cols-10">
            <div className="col-span-2 bg-blue-200"></div>
                <div className="col-span-6 bg-blue-200">
                    <Header/>
                    
                    <Cards title="ChatGPT" desc="euwhrfjwehfuhehfuehfhe feruhfefuewfjiuerhfuierf fuerhfiefuierfuierhfuierf f fruhfiehwiufeiufhuiehfuehfehf"/>

                    <Footer/>

                </div>
            <div className="col-span-2 bg-blue-200"></div>
      
        </div>
      
    );
}
*/

'use client'
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogApi');
                const result = await response.json();
                if (result.result) {
                    setBlogs(result.result);
                } else {
                    setError(result.error);
                }
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchBlogs();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-flex grid grid-cols-10">
            <div className="col-span-2 bg-blue-200"></div>
                <div className="col-span-6 bg-blue-200">
                    <Header/>
                    
                    



                    <div>
                        {blogs.length > 0 ? (
                            <ul>
                                {blogs.map((blog) => (
                                    <Cards title={blog.title} desc={truncateText(blog.desc, 60)} href={`/blogs/${blog._id}`}  />
                                ))}
                            </ul>
                        ) : (
                            <p>No blogs available</p>
                        )}
                    </div>



                    <Footer/>

                </div>
            <div className="col-span-2 bg-blue-200"></div>
      
        </div>

    );
}

