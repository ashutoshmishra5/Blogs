import Image from "next/image";

const Header = () => {
    return (
        <>
        <nav className="bg-blue-300 p-4">
                    <div className="container"><div className="flex items-center justify-center text-4xl text-gray-500 font-bold py-4">Blogs</div></div>
                    <div className="container mx-auto">
                        <ul className="flex items-center justify-center space-x-4">
                                <li><a href="/" className="text-white font-medium">Home</a></li>
                                <li><a href="/dashboard" className="text-white font-medium">Dashboard</a></li>
                                <li><a href="/register" className="text-white font-medium">Register</a></li>
                                <li><a href="/login" className="text-white font-medium">Login</a></li>
                            </ul>
                    </div>
                    </nav>
        </>
    );
}

export default Header;