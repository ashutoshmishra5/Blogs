import { NextResponse } from "next/server";
import { useState, useEffect } from "react";


    const CommentForm = ({blogId}) => {
    const [data,setData] = useState(
        {
            blogId: blogId,
            commentAuthor: "",
            blogComment: "",
            commentDate: ""
        }
    );

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
        } catch(error) {
            alert("error:error commenting");
        }
    };

    return (
        <>
            <form onSubmit={postComment}>
                <input  
                    id="commentAuthor"
                    name="commentAuthor"
                    type="text"
                    autoComplete="commentAuthor"
                    required
                    value={data.commentAuthor}
                    onChange={(e) => setData({ ...data, commentAuthor: e.target.value })}
                 /> 

                <input 
                    id="blogComment"
                    name="blogComment"
                    type="text"
                    autoComplete="blogComment"
                    required
                    value={data.blogComment}
                    onChange={(e) => setData({ ...data, blogComment: e.target.value })}
                 />                
                 
                 <input 
                    id="commentDate"
                    name="commentDate"
                    type="text"
                    autoComplete="commentDate"
                    required
                    value={data.commentDate}
                    onChange={(e) => setData({ ...data, commentDate: e.target.value })}
              />
              <button type="submit">Submit Comment</button>
            </form>

        </>
   
    );
}

export default CommentForm;


