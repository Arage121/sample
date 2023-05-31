import React, { useState, useEffect } from 'react';

const Code = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const filteredData = data.filter((item) => item.userId === 8);
      setPosts(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      const sortData = data.filter((comm) => comm.postId === 8);
      setComments(sortData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const countOccurrences = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === "\\") {
        count++;
      }
    }
    return count; // Add this line to return the count
    
  };
  
  return (
    <>
      {posts.map(({ id, userId, title, body }) => (
        <div key={id}>
          <p>{userId}</p>
          <p>{title}</p>
          <p>{body}</p>
        </div>
      ))}

      {comments.map(({ id, body }) => (
        <div key={id}>
          <p>Number of '\' occurrences: {countOccurrences(body)}</p>
        </div>
      ))}
    </>
  );
};

export default Code;
