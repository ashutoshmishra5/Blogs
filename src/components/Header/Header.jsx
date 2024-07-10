import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const {data: session, status } = useSession();

    return (
        <>
        <nav className="bg-blue-300 p-4">
                    <div className="container"><div className="flex items-center justify-center text-4xl text-gray-500 font-bold py-4">Blogs</div></div>
                    <div className="container mx-auto">
                        <ul className="flex items-center justify-center space-x-4">
                                <li><a href="/" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Home</a></li>
                                <li><a href="/dashboard" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Dashboard</a></li>
                                {!session && (
                                    <>
                                    <li className=""><a href="/register" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Register</a></li>
                                    <li className=""><a href="/login" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Login</a></li>
                                    </>
                                )
                                }
                                { session && (
                                    <>
                                    <li className=""><a href="#" onClick={()=>signOut({callbackUrl: '/'})} className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2"> Logout</a></li>
                                    <li className=""><a className="text-white font-sm"> Hi {session?.user.name}</a></li> 
                                    </>
                                )
                                }
                                
                            </ul>
                    </div>
                    </nav>
        </>
    );
}

export default Header;