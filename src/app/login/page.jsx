'use client';
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SignInForm from "@/components/SignInForm/SignInForm";

const LogInPage = () => {
    return (
        <>
            <div className="container-flex grid grid-cols-10">
                <div className="md:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                    <Header />
                    <SignInForm />
                    <Footer />
                </div>
                <div className="md:col-span-2 bg-blue-200"></div>
            </div>
        </>
    );
};

export default LogInPage;
