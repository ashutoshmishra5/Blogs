const Cards = ({title,desc,href}) => {
    return (
        <>
            <div>
                <div className="py-6">
                        <div className="overflow-hidden bg-gray-200 hover:shadow-lg transform hover:-translate-y-1 duration-1000">
                            <a href={href}>
                                <div className="flex"><h1 className="my-4 mx-4 text-2xl">{title}</h1></div>
                                <div className="flex bg-gray-200 font-semibold text-gray-500"><h1 className="my-4 mx-4">{desc}</h1></div>
                            </a>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Cards;