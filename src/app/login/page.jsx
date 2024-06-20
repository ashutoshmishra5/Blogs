'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn,useSession } from "next-auth/react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


const LogInPage = () => {
    const router = useRouter();
    const {data: session, status } = useSession();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [pressed, setPressed] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        if (!pressed) {
            setPressed(true);
            setLoading(true);
            const response = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (response.error) {
                setPressed(false);
                setLoading(false);
                alert("Login unsuccessful");
            }
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            setLoading(false);
            alert("Login successful");
            router.push("/dashboard");
        } else if (status === 'unauthenticated' && pressed) {
            setPressed(false);
            setLoading(false);
        }
    }, [status, pressed, router]);

    return (
        <>
            <div className="container-flex grid grid-cols-10">
            <div className="md:col-span-2 bg-blue-200"></div>
                <div className="col-span-10 md:col-span-6 bg-blue-200 px-2">
                    <Header/>
                    
                <div className="flex flex-1 flex-col justify-center container-flex grid grid-cols-6 ">
                <div className="col-span-1"></div>
                <div className="col-span-4">
                <h2 className="mt-10 text-center my-4 mx-4 text-2xl font-bold">
                        Sign in to your account
                    </h2>
                    <div className="mt-10">
                    <form className="space-y-6" onSubmit={loginUser}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="container flex flex-row items-center justify-center mt-8 ml-auto bg-slate-500 text-white px-4 py-2 rounded"
                                >
                                LogIn
                            </button>
                        </div>
                    </form>

                </div>

                </div>
                
                <div className="col-span-1"></div>
                    </div>

                    <Footer/>

                </div>
            <div className="md:col-span-2 bg-blue-200"></div>
      
        </div>


        </>
    );
};

export default LogInPage;