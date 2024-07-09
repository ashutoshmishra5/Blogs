'use client';
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import BlogDisplayComponent from "@/components/BlogDisplayComponent/BlogDisplayComponent";
import CommentComponent from "@/components/CommentComponent/CommentComponent";
import CommentForm from "@/components/CommentForm/CommentForm";
import Link from "next/link";



const CommentPage = ({ params }) => {
    const { id } = params;
    return (
        <div>
            <Header />
            <h1>{id}</h1>
            <CommentComponent blogId={id} />
            <CommentForm blogId={id} />
            <Footer />

        </div>
    );
};

export default CommentPage;
