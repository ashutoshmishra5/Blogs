import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Header = () => {
    const {data: session, status } = useSession();
    const [mobileMenu,setMobileMenu] = useState(false);
    return (
        <>
        <nav className="bg-blue-300 w-full">
                    {/*<div className="container"><div className="flex items-center justify-center text-4xl text-gray-500 font-bold py-4">Blogs</div></div>*/
                     /*                    
                     <div className="container">
                        <div className="flex items-center justify-center text-4xl text-gray-500 font-bold"> 
                            <Image className="object-cover" src="/logo1.png" height={50} width={150} alt="logo" />
                        </div>
                    </div>
                    */}

                    
                    <div className="container mx-auto px-4 py-2">

                    <div className="hidden sm:block sm:flex justify-between items-center">
                        <a href="/" className=""> <Image className="object-cover hover:opacity-50 duration-200" src="/logo1.png" height={60} width={80} alt="logo" /> </a>
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

                    <div className="sm:hidden flex justify-between items-center">
                        <a href="/" className=""> <Image className="object-cover hover:opacity-50 duration-200" src="/logo1.png" height={60} width={80} alt="logo" /> </a>
                        <button onClick={()=>(setMobileMenu(!mobileMenu))}><i class="fa-solid fa-bars"></i></button>
                    </div>

                    </div>

                    {mobileMenu && 
                        <div class="fixed bg-slate-200 bottom-0 top-0 right-0 h-screen w-2/5 z-[60] pt-16" >
                        <ul className="flex-row space-y-2 w-full">
                            <button className="font-medium px-4 py-4 fixed top-0 right-0" onClick={()=>(setMobileMenu(!mobileMenu))}><i class="fa fa-close"></i></button>
                            <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a href="/" className="w-full font-medium">Home</a></li>
                            <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a href="/dashboard" className="w-full font-medium">Dashboard</a></li>
                            {!session && (
                                <>
                                    <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a href="/register" className="w-full font-medium">Register</a></li>
                                    <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a href="/login" className="w-full font-medium">Login</a></li>
                                </>
                            )}
                            {session && (
                                <>
                                    <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a href="#" onClick={() => signOut({ callbackUrl: '/' })} className="w-full font-medium hover:bg-gray-400 rounded-2xl px-2 py-2">Logout</a></li>
                                    <li className="w-full hover:bg-gray-300 rounded-md px-2 py-2"><a className="w-full font-sm">Hi {session?.user.name}</a></li>
                                </>
                            )}
                        </ul>
                        </div>}

                    </nav>
        </>
    );
}

export default Header;