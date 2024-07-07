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
    } catch(error) {
      return NextResponse.json("error: error getting Comments")
    }
  } 

  useEffect(()=>{
    fetchCommentbyId();
  },[fetchCommentbyId]);

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


