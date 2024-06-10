const Cards = ({key,title,desc,href}) => {
    return (
        <>
            <div key={key}>
                <div className="pb-2">
                        <div className="overflow-hidden bg-gray-200 hover:shadow-lg transform hover:-translate-y-1 duration-1000">
                            <a href={href}>
                                <div className="flex"><h1 className="my-4 mx-4 text-xl font-semibold">{title}</h1></div>
                                <div className="flex bg-gray-200 text-md text-gray-500"><h1 className="my-4 mx-4">{desc}</h1></div>
                            </a>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
