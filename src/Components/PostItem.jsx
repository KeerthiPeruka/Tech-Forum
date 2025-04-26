import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../PostContext';

function PostItem({ post }) {
  const { upvotePost } = usePosts();

  const handleUpvote = () => {
    upvotePost(post.id);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Upvotes: {post.upvotes}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <Link to={`/post/${post.id}`}>View Post</Link>
    </div>
  );
}

export default PostItem;
