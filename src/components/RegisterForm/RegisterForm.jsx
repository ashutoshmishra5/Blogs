'use client';

import { registerUser } from '@/app/lib/authFunctions';
import { useRouter } from 'next/navigation';
import { useState } from "react";

const RegisterForm = () => {
    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        registerUser(router,data);
        };

        
    return (
        <>
                    <div className="flex flex-1 flex-col justify-center container-flex grid grid-cols-6 ">
                    <div className="col-span-1"> </div>
                        <div className="col-span-4">

                            <h2 className="mt-10 text-center my-4 mx-4 text-2xl font-bold">
                            Register for new account
                            </h2>

                            <div className="mt-10">
                            <form className="space-y-6" onSubmit={handleRegisterUser}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

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
                                        Register
                                    </button>
                                </div>
                            </form>
                            </div>

                        </div>
                    <div className="col-span-1"> </div>


                    </div>


        </>
    );
};

export default RegisterForm;