import Link from "next/link";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";

const CommentComponent = ({ blogId }) => {
  const [showComments,setShowComments] = useState(false);
  const [comments,setComments] = useState([]);
  
  const fetchCommentbyId = async () => {
    try{
      const response = await fetch(`/api/commentAPIs/fetchComments/${blogId}`);
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(()=>{
    fetchCommentbyId();
  },[]);

    return (
        <>
          <button className="block pl-1 py-2 my-2" type = "button" onClick = {() => (setShowComments(!showComments))}
            > {showComments===false ? (<i className="fa-solid fa-angle-right"/>) : (<i className="fa-solid fa-angle-down"></i>)} Show Comments</button>
          {showComments && (comments.length > 0 ? (
            <ul>
                {comments.map((comment) => (
                  <div className="bg-slate-200 my-2" key = {comment._id}>
                    <div className="container">
                        <div className="px-2 flex items-center py-2">
                          <Link className="font-semibold text-sm pr-2 hover:underline" href="#">{comment.commentAuthor}</Link>
                          <div className="text-xs">{comment.commentDate} </div>
                        </div>
                    </div>

                    <div className="pl-2 pb-2">{comment.blogComment}</div>
                  </div>
                ))}
            </ul>
          ) : (
            <p>No comments available</p>
          ))}
        </>
    );
}

export default CommentComponent;


