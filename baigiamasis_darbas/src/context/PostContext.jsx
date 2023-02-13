import React, { createContext, useState, useEffect } from 'react';

const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/posts')
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
    const newPost = { id: posts.length + 1, title, body };
    fetch('http://localhost:5000/posts', {
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
    const editedPost = { id, title, body };
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPost),
    })
      // .then(response => response.json())
      // .then(data => {
        const updatedPosts = posts.map((post) => (post.id === id ? editedPost : post));
        setPosts(updatedPosts);
        setLoading(false);
      // })
      // .catch(error => {
      //   console.error(error);
      //   setLoading(false);
      // });
  };

  const deletePost = (id) => {
    setLoading(true);
    fetch(`http://localhost:5000/posts/${id}`, {
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
    const likedPost = posts.find((post) => post.id === id);
    likedPost.likes = likedPost.likes ? likedPost.likes + 1 : 1;

    fetch(`http://localhost:5000/posts/${id}/likes`, {
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
    const dislikedPost = posts.find((post) => post.id === id);
    dislikedPost.dislikes = dislikedPost.dislikes ? dislikedPost.dislikes + 1 : 1;
  
    fetch(`http://localhost:5000/posts/${id}/dislikes`, {
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
  

  return (
    <PostContext.Provider value={{ posts, loading, addPost, editPost, deletePost, likePost, dislikePost }}>
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContextProvider };
export default PostContext;