import { useParams, Link } from "react-router-dom";
import api, { errHandler } from "../api";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const PostPage = () => {
  const { posts, setPosts, navigate } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((p) => p.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      errHandler(err);
    }
  };

  const Post = ({ post, id }) => {
    return (
      <>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        <p className="postBody">{post.body}</p>
        <Link to={`/edit/${id}`}>
          <button className="editButton">Edit Post</button>
        </Link>
        <button className="deleteButton" onClick={() => handleDelete(id)}>
          Delete Post
        </button>
      </>
    );
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <Post post={post} id={id} />
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
