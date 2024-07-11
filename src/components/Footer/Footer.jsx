const Footer = () => {
    return (
        /*<>
        <div>
                <div className="container flex flex-row items-center justify-center mt-8">
                    <div className="mx-1 underline text-gray-400 hover:text-gray-800"><a href="">Terms</a></div>
                    <div className="mx-1 underline text-gray-400 hover:text-gray-800"><a href="">Privacy</a></div>
                    <div className="mx-1 underline text-gray-400 hover:text-gray-800"><a href="">About Us</a></div>
                </div>                
                <div className="container flex flex-row items-center justify-center mt-8">
                    <div className="mx-4 text-3xl"><a href="#"><i className="fab fa-linkedin text-blue-400 hover:text-blue-600 duration-1000"></i></a></div>
                    <div className="mx-4 text-3xl"><a href="#"><i className="fab fa-twitter text-blue-400 hover:text-blue-600 duration-1000"></i></a></div>
                    <div className="mx-4 text-3xl"><a href="#"><i className="fab fa-facebook text-blue-400 hover:text-blue-600 duration-1000"></i></a></div>
                </div>

                <div className="flex items-center justify-center mt-8 text-gray-500 text-sm">© 2024 Blogs</div>
                
                    </div>
        </>*/

        <div className="container-flex grid grid-cols-10 bg-blue-200 pt-6">
        <div className="md:col-span-1  bg-slate-200"></div>
        <div className="col-span-10 md:col-span-8  bg-slate-200 px-2">
            <div className="px-8 py-8  ">
                <div className="mb-8 mr-[5px] w-full md:mb-0 md:w-full">
                    <p className="mb-4 text-xl font-semibold">About Basic Thinking</p>
                    <p className="text-[14px]">Basic Thinking delivers reliable, practical articles to tech enthusiasts and professionals. We prioritize what works in real-world applications, rather than following fleeting trends. Our independence guarantees unbiased content that genuinely benefits our readers.</p>
                    <br />
                    <p className="text-[14px]">Basic Thinking is a publication by Innovate Media GmbH.</p>
                    <a className="mt-4 text-sm text-[#ca4242]" href="mailto:editor@basicthinking.com" target="_top">editor@basicthinking.com</a>
                </div>

                <div className="container pt-4">
                    <div className="flex-row sm:flex">
                        <div className="mb-8 md:mb-0 md:w-[25%]">
                            <p className="mb-4 text-xl font-semibold">Useful Links</p>
                            <ul className="">
                                <li><a href="/" className="text-[14px]">About Us</a></li>
                                <li><a href="/"className="text-[14px]">Subscriptions Support</a></li>
                                <li><a href="/" className="text-[14px]">Editorial Philosophy</a></li>
                                <li><a href="/" className="text-[14px]">Press Kit</a></li>
                            </ul>
                        </div>

                        <div className="mb-8 mt-[45px] md:mb-0 md:w-[25%]">
                            <ul className="">
                                <li><a href="/" className="text-[14px]">Privacy Policy</a></li>
                                <li><a href="/" className="text-[14px]">Terms of Use</a></li>
                                <li><a href="/" className="text-[14px]">Code of Conduct</a></li>
                                <li><a href="/" className="text-[14px]">Plagiarism Policy</a></li>
                                <li><a href="/" className="text-[14px]">Refund & Cancellation Policy</a></li>
                            </ul>
                        </div>

                        <div className="mb-8 md:mb-0 md:w-[25%]">
                            <p className="mb-4 text-xl font-semibold">Participate</p>
                            <ul className="">
                                <li><a href="/" className="text-[14px]">Contact Us</a></li>
                                <li><a href="/"className="text-[14px]">Write for us</a></li>
                                <li><a href="/" className="text-[14px]">Style Guide</a></li>
                                <li><a href="/" className="text-[14px]">Jobs</a></li>
                            </ul>
                        </div>

                        <div className="mb-8 md:mb-0 md:w-[25%]">
                            <p className="mb-4 text-xl font-semibold px-2">Stay Connected</p>
                            <div className="container flex space-x-4 px-2">
                                <div className="text-xl"><a href="#"><i className="fab fa-linkedin text-blue-400 hover:text-blue-600 duration-200"></i></a></div>
                                <div className="text-xl"><a href="#"><i className="fab fa-twitter text-blue-400 hover:text-blue-600 duration-200"></i></a></div>
                                <div className="text-xl"><a href="#"><i className="fab fa-facebook text-blue-400 hover:text-blue-600 duration-200"></i></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="md:col-span-1  bg-slate-200"></div>
    </div>
    );
}

export default Footer;