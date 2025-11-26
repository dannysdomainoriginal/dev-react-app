import { format } from "date-fns";
import { usePostStore } from "../store/posts";
import { shallow } from "zustand/shallow";

const NewPost = ({ navigate }) => {
  const postTitle = usePostStore((s) => s.postTitle);
  const postBody = usePostStore((s) => s.postBody);
  const savePost = usePostStore((s) => s.savePost);
  const setPostTitle = usePostStore((s) => s.setPostTitle);
  const setPostBody = usePostStore((s) => s.setPostBody);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { title: postTitle, datetime, body: postBody };

    savePost(newPost);
    navigate("/");
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
