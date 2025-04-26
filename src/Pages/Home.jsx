import React, { useState } from 'react';
import { usePosts } from '../PostContext';
import { Link } from 'react-router-dom';
import PostItem from '../components/PostItem';

//home page 
function Home() {
  const { posts } = usePosts();
  const [sortBy, setSortBy] = useState('time');
  const [searchQuery, setSearchQuery] = useState('');

  //sort based on time or upvotes
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  //search for the post
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  return (
    <div>
      <h1>Post Feed</h1>
      <Link to="/create">
        <button>Create a Post</button>
      </Link>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select onChange={handleSortChange} value={sortBy}>
        <option value="time">Creation Time</option>
        <option value="upvotes">Upvotes</option>
      </select>
      {sortedPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
