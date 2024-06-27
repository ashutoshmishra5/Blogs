'use client';
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import BlogDisplayComponent from "@/components/BlogDisplayComponent/BlogDisplayComponent";


const BlogPage = ({ params }) => {
    const { id } = params;
    return (
        <div>
            

            <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                    <Header/>
                    <BlogDisplayComponent id = {id}/>
                    <Footer/>

                </div>
            <div className="md:col-span-2 bg-blue-200"></div>
      
            </div>
        </div>
    );
};

export default BlogPage;
