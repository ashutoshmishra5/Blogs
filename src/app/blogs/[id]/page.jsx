'use client';
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import BlogDisplayComponent from "@/components/BlogDisplayComponent/BlogDisplayComponent";
import CommentComponent from "@/components/CommentComponent/CommentComponent";
import CommentForm from "@/components/CommentForm/CommentForm";
import Link from "next/link";



const BlogPage = ({ params }) => {
    const { id } = params;
    return (
        <div>
            <Header/>
            <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-1 lg:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-8 lg:col-span-6 bg-blue-200 px-2">
                     
                    <BlogDisplayComponent id = {id}/>
                    <CommentComponent blogId={id} />
                    <CommentForm blogId={id} />

                </div>
            <div className="md:col-span-1 lg:col-span-2 bg-blue-200"></div>
      
            </div>
            <Footer/>

        </div>
    );
};

export default BlogPage;
