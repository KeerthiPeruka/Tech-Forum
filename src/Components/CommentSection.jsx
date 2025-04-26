import React, { useState } from 'react';
import { usePosts } from '../PostContext'; 

function CommentSection({ postId }) {
  const { getPostById, editPost } = usePosts();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(getPostById(postId)?.comments || []);

  // comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // check if comment is not null
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    // Create comment object
    const newComment = {
      id: comments.length + 1, 
      text: comment,
    };

    // adding a comment
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const updatedPost = {
      ...getPostById(postId),
      comments: updatedComments,
    };
    editPost(postId, updatedPost); 

    setComment('');
  };

  return (
    <div>
      <h3>Leave a Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment here"
          required
        />
        <button type="submit">Submit Comment</button>
      </form>

      <div>
        <h4>Comments</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentSection;
