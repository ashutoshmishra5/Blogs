import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const {data: session, status } = useSession();

    return (
        <>
        <nav className="bg-blue-300">
                    {/*<div className="container"><div className="flex items-center justify-center text-4xl text-gray-500 font-bold py-4">Blogs</div></div>*/
                     /*                    
                     <div className="container">
                        <div className="flex items-center justify-center text-4xl text-gray-500 font-bold"> 
                            <Image className="object-cover" src="/logo1.png" height={50} width={150} alt="logo" />
                        </div>
                    </div>
                    */}

                    
                    <div className="container mx-auto px-4 py-2">

                    <div className="flex justify-between items-center">
                        <a href="/"> <Image className="object-cover hover:opacity-50 duration-200" src="/logo1.png" height={60} width={80} alt="logo" /> </a>
                        <ul className="flex space-x-4">
                            <li><a href="/" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Home</a></li>
                            <li><a href="/dashboard" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Dashboard</a></li>
                            {!session && (
                                <>
                                    <li><a href="/register" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Register</a></li>
                                    <li><a href="/login" className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Login</a></li>
                                </>
                            )}
                            {session && (
                                <>
                                    <li><a href="#" onClick={() => signOut({ callbackUrl: '/' })} className="text-white font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Logout</a></li>
                                    <li><a className="text-white font-sm">Hi {session?.user.name}</a></li>
                                </>
                            )}
                        </ul>
                    </div>


                    </div>
                    </nav>
        </>
    );
}

export default Header;