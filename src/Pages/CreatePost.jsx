import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../PostContext';

//function for creating a post
function CreatePost() {
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      imageUrl,
      upvotes: 0,
      comments: [],
      id: Date.now(),  // Using timestamp as a unique ID
      createdAt: new Date().toISOString(),
    };
    addPost(newPost);
    navigate('/');
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL(Optional):</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
