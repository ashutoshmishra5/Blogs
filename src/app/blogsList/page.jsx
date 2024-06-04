'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

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
        <div>
            <div className='text-2xl'>Blogs</div>
            {blogs.length > 0 ? (
                <ul>
                    {blogs.map((blog) => (
                        <li className='bg-slate-100 my-4 mx-4' key={blog._id}>
                            <Link href={`/blogs/${blog._id}`}>
                                {blog.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
}
