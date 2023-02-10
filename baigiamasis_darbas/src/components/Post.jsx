import React, { useContext } from 'react';
import { PostContext } from '../context/PostContext';

const Post = () => {
  const { posts, loading, addPost, editPost, deletePost, likePost, dislikePost } = useContext(PostContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    addPost(title, body);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    editPost(id, title, body);
  };

  return (
    <div className="post">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" />
            <textarea name="body" placeholder="Body" />
            <button type="submit">Create Post</button>
          </form>
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>Likes: {post.likes || 0}</p>
              <p>Dislikes: {post.dislikes || 0}</p>
              <button onClick={() => likePost(post.id)}>Like</button>
              <button onClick={() => dislikePost(post.id)}>Dislike</button>
              <form onSubmit={(event) => handleEdit(event, post.id)}>
                <input type="text" name="title" defaultValue={post.title} />
                <textarea name="body" defaultValue={post.body} />
                <button type="submit">Edit Post</button>
              </form>
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Post;
