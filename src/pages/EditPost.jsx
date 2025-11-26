import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { usePostStore } from "../store/posts";
import { shallow } from "zustand/shallow";

const EditPost = ({ navigate }) => {
  const { id } = useParams();

  const editTitle = usePostStore((s) => s.editTitle);
  const editBody = usePostStore((s) => s.editBody);
  const editPost = usePostStore((s) => s.editPost);
  const setEditTitle = usePostStore((s) => s.setEditTitle);
  const setEditBody = usePostStore((s) => s.setEditBody);
  const post = usePostStore((s) => s.getPostById(id));

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

    editPost(updatedPost);
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
