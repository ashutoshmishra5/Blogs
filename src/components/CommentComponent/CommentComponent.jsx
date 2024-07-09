import { NextResponse } from "next/server";
import { useState, useEffect } from "react";


const CommentComponent = ({ blogId }) => {
  const [showComments,setShowComments] = useState(false);
  const [comments,setComments] = useState([]);
<<<<<<< HEAD

  
  const fetchCommentbyId = async () => {
    try{
=======
    const fetchCommentbyId = async () => {
    try {
>>>>>>> ecce30f7ba39db824ec09fb49168947fad38e671
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
          <button type = "button" onClick = {() => (setShowComments(!showComments))}>Show Comments</button>
          {showComments && (comments.length > 0 ? (
            <ul>
                {comments.map((comment) => (
                  <div key = {comment._id}>
                    <div>{comment.commentDate}</div>
                    <div>{comment.commentAuthor}</div>
                    <div>{comment.blogComment}</div>
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


