import { NextResponse } from "next/server";
import { useState, useEffect } from "react";


    const CommentForm = ({blogId}) => {
        const now = new Date();
    const [data,setData] = useState(
        {
            blogId: blogId,
            commentAuthor: "",
            blogComment: "",
            commentDate: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}` + " " + `${now.getHours()}:${now.getMinutes()}`
        }
    );
    const [allowComments,setAllowComments] = useState(false);


    const postComment = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch(`/api/commentAPIs/addComment`, {
                method : 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({data}),
            });
            const result = await response.json();
            alert(result.data);
            //causes API to fail
            setData((prevData) => ({
                ...prevData,
                commentAuthor: "",
                blogComment: "",
                commentDate: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}` + " " + `${now.getHours()}:${now.getMinutes()}`
              }));

        } catch(error) {
            alert("error:error commenting");
        }
    };

    return (
        <>
            <button className="block rounded-2xl bg-inherit border-2 border-neutral-900 px-2 py-2 mb-2" type="button" onClick={()=>(setAllowComments(!allowComments))} >+ Add a Comment</button>
            { allowComments && (<form onSubmit={postComment}>

                <input  
                    id="commentAuthor"
                    name="commentAuthor"
                    type="text"
                    autoComplete="commentAuthor"
                    placeholder="Author"
                    required
                    value={data.commentAuthor}
                    onChange={(e) => setData({ ...data, commentAuthor: e.target.value })}
                    className="block rounded-md border-0 placeholder:text-gray-400 mb-2"
                 /> 

                <textarea 
                    id="blogComment"
                    name="blogComment"
                    type="text"
                    autoComplete="blogComment"
                    placeholder="Comment"
                    required
                    value={data.blogComment}
                    onChange={(e) => setData({ ...data, blogComment: e.target.value })}
                    className="block w-full rounded-md border-0 placeholder:text-gray-400 mb-2"
                 />                
                 
              <button className="block rounded-2xl text-white bg-blue-800 border-2 px-2 py-2" type="submit">Comment</button>
            </form>
        )}

        </>
   
    );
}

export default CommentForm;


