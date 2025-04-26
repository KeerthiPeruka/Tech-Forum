import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../PostContext';
import CommentSection from '../components/CommentSection';

function PostPage() {
  const { id } = useParams();
  const { getPostById, editPost, deletePost, upvotePost } = usePosts();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  useEffect(() => {
    const fetchedPost = getPostById(Number(id));
    if (fetchedPost) {
      setPost(fetchedPost);
      setUpdatedTitle(fetchedPost.title);
      setUpdatedContent(fetchedPost.content);
      setUpdatedImage(fetchedPost.image);
    }
  }, [id, getPostById]);

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedPost = {
      title: updatedTitle,
      content: updatedContent,
      image: updatedImage,
    };
    editPost(post.id, updatedPost);
    setIsEditing(false);
  };

  const handleUpvote = () => {
    upvotePost(post.id);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      {isEditing ? (
        <div>
          <h3>Edit Post</h3>
          <form onSubmit={handleEdit}>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              required
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              required
            />
            <input
              type="text"
              value={updatedImage}
              onChange={(e) => setUpdatedImage(e.target.value)}
              placeholder="Image URL"
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post visual" />}
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
          <div>
            <button onClick={handleUpvote}>Upvote</button>
            <span>Upvotes: {post.upvotes}</span>
          </div>
        </>
      )}
      <h3>Comments</h3>
      <CommentSection postId={post.id} />
    </div>
  );
}

export default PostPage;
