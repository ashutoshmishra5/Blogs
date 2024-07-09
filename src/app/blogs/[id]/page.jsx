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
            

            <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                    
                    <Header/>
                    <BlogDisplayComponent id = {id}/>
                    <CommentComponent blogId={id} />
                    <CommentForm blogId={id} />
                    <Link href={`/comments/${id}`} > CommentsPage </Link>
                    <Footer/>

                </div>
            <div className="md:col-span-2 bg-blue-200"></div>
      
            </div>
        </div>
    );
};

export default BlogPage;
