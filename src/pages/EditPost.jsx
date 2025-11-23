import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import api, { errHandler } from "../api";
import DataContext from "../context/DataContext";

const EditPost = () => {
  const { setPosts, posts, navigate } = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostBody(post.body);
    }
  }, [post]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { title: postTitle, datetime, body: postBody };

    try {
      const res = await api.put(`/posts/${id}`, updatedPost);
      const postsList = posts.map((post) => (post.id === id ? res.data : post));
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      errHandler(err);
    }
  };

  return (
    <main className="NewPost">
      {post ? (
        <>
          <h2>Update Post</h2>
          <form className="newPostForm" onSubmit={handleEdit}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />

            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
