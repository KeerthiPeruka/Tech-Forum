import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]); // ⬅️ Start with empty posts, remove the fake ones

  // Add a post
  const addPost = (newPost) => {
    setPosts(prevPosts => [
      ...prevPosts,
      { ...newPost, id: Date.now(), upvotes: 0, comments: [] }
    ]);
  };

  // Edit a post
  const editPost = (id, updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  // Upvote a post
  const upvotePost = (id) => {
    setPosts(prevPosts =>
      prevPosts.map(post => 
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  // Get a post by ID
  const getPostById = (id) => {
    return posts.find(post => post.id === id);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost, upvotePost, getPostById }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
