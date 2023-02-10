import { createContext, useState, useEffect } from 'react';

const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch data from JSON file
    fetch('http://localhost:7000/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addPost = (title, body) => {
    setLoading(true);
    // Make API call to create a new post
    const newPost = { id: posts.length + 1, title, body };
    fetch('http://localhost:7000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, data]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const editPost = (id, title, body) => {
    setLoading(true);
    // Make API call to update the post
    const editedPost = { id, title, body };
    fetch(`http://localhost:7000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPost),
    })
      .then(response => response.json())
      .then(data => {
        const updatedPosts = posts.map((post) => (post.id === id ? data : post));
        setPosts(updatedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const deletePost = (id) => {
    setLoading(true);
    // Make API call to delete the post
    fetch(`http://localhost:7000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const likePost = (id) => {
    setLoading(true);
    // Make API call to like the post
    const likedPost = posts.find((post) => post.id === id);
    likedPost.likes = likedPost.likes ? likedPost.likes + 1 : 1;

    // Perform the actual API call
    fetch(`http://localhost:7000/questions/${id}/like`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const updatedPosts = posts.map((post) => (post.id === id ? data : post));
        setPosts(updatedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const dislikePost = (id) => {
    setLoading(true);
    // Make API call to dislike the post
    const dislikedPost = posts.find((post) => post.id === id);
    dislikedPost.dislikes = dislikedPost.dislikes ? dislikedPost.dislikes + 1 : 1;

    // Perform the actual API call
    fetch(`http://localhost:7000/questions/${id}/dislike`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const updatedPosts = posts.map((post) => (post.id === id ? data : post));
        setPosts(updatedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
};

export {PostContextProvider};
export default PostContext;
