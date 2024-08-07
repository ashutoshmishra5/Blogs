import Image from "next/image";

const Cards = ({key,title,desc,href,author,date,imgUrl}) => {
    return (
        <>
            <div key={key}>
                <div className="py-1">
                        <div className="rounded-xl container overflow-hidden bg-gray-200 transform hover:-translate-y-1 hover:shadow-lg duration-1000 py-1">
                                <a href={href}>
                                <div className="sm:flex flex-row">

                                <div className="rounded-xl flex justify-center px-1 py-2 relative sm:w-1/4 h-60">
                                    <Image className="rounded-xl overflow-hidden object-cover" src={imgUrl} height={700} width={700} alt="" />
                                </div>

                                <div className="flex-row sm:w-3/4 h-60">
                                    <div className="flex"><h1 className="my-4 mx-4 text-xl font-semibold">{title}</h1></div>
                                    <div className="flex bg-slate-200">
                                        <div className='text-xs pl-4'>Written By <span className="font-medium">{author}</span></div>
                                        <div className='text-xs pl-1'>| Updated: {date}</div>
                                    </div>
                                    <div className="flex bg-gray-200 text-md text-gray-500"><h1 className="my-4 mx-4">{desc}</h1></div>
                                    </div>
                                </div>

                                </a>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
