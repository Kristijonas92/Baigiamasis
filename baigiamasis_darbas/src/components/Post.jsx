import { useContext, useState } from 'react';
import PostContext from '../context/PostContext';

const Post = () => {
  const { posts, loading, addPost, editPost, deletePost, likePost, dislikePost } = useContext(PostContext);
  const [sortMethod, setSortMethod] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showAnswered, setShowAnswered] = useState(true);
  const [showUnanswered, setShowUnanswered] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const created_at = new Date().toISOString();
    addPost(title, body, created_at);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    editPost(id, title, body);
  };

  const sortPosts = (posts) => {
    if (sortMethod === "date") {
      return sortOrder === "asc"
        ? posts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        : posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortMethod === "answers") {
      return sortOrder === "asc"
        ? posts.sort((a, b) => a.answers.length - b.answers.length)
        : posts.sort((a, b) => b.answers.length - a.answers.length);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (showAnswered && showUnanswered) return true;
    if (showAnswered && post.answers.length > 0) return true;
    if (showUnanswered && post.answers.length === 0) return true;
    return false;
  });

  return (
    <div className="post">
      <div className="sort-options">
        <p>Sort by:</p>
        <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="date">Date</option>
          <option value="answers">Answers</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="filter-options">
        <p> Show:</p>
        <input
          type="checkbox"
          checked={showAnswered}
          onChange={(e) => setShowAnswered(e.target.checked)}
        />
        Answered
        <input
          type="checkbox"
          checked={showUnanswered}
          onChange={(e) => setShowUnanswered(e.target.checked)}
        />
        Unanswered
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <textarea name="body" placeholder="Body" />
        <button type="submit">Add Post</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="posts">
          {sortPosts(filteredPosts).map((post) => (
            <ul>
              <li key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>{post.created_at}</p>
                <p>Likes:{post.likes || 0}</p>
                <p>Dislikes{post.dislikes || 0}</p>
                <p>{post.answers && post.answers.map((answer) => (
                  <li key={answer.id}>
                    <p>{answer.body}</p>
                    <p>{answer.created_at}</p>
                    <p>Likes:{answer.likes}</p>
                    <p>Dislikes{answer.dislikes}</p>
                  </li>
                ))}</p>
                <button onClick={(e) => handleEdit(e, post.id)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <button onClick={() => likePost(post.id)}>Like</button>
                <button onClick={() => dislikePost(post.id)}>Dislike</button>
              </li>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;