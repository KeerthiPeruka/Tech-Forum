import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', content: 'Content for the first post.', image: '', comments: [], upvotes: 0 },
    { id: 2, title: 'Second Post', content: 'Content for the second post.', image: '', comments: [], upvotes: 0 },
  ]);

  // Edit a post
  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Upvote a post
  const upvotePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  // Get a post by ID
  const getPostById = (id) => {
    return posts.find(post => post.id === id);
  };

  return (
    <PostContext.Provider value={{ posts, editPost, deletePost, upvotePost, getPostById }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
