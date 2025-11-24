import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = ({ navigate }) => {
  const { id } = useParams();
  const { editTitle, editBody, getPostById } = useStoreState((state) => state);
  const { editPost, setEditTitle, setEditBody } = useStoreActions((actions) => actions);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };

    await editPost(updatedPost);
    navigate(`/posts/${id}`);
  };

  return (
    <main className="NewPost">
      {post ? (
        <>
          <h2>Update Post</h2>
          <form className="newPostForm" onSubmit={handleEdit}>
            <label htmlFor="editTitle">Title:</label>
            <input
              type="text"
              id="editTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
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
