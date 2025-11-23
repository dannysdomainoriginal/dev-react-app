import { useState, useContext } from "react";
import { format } from "date-fns";
import api, { errHandler } from "../api";
import DataContext from "../context/DataContext";

const NewPost = () => {
  const { setPosts, posts, navigate } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { title: postTitle, datetime, body: postBody };

    try {
      const res = await api.post("/posts", newPost);
      const postsList = [...posts, res.data];
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      errHandler(err);
    }
  };

  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
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
    </main>
  );
};

export default NewPost;
