import { useParams, Link } from "react-router-dom";
import api, { errHandler } from "../api";
import { useStoreState, useStoreActions } from "easy-peasy";

const PostPage = ({ navigate }) => {
  const { id } = useParams();

  const deletePost = useStoreActions((actions) => actions.deletePost)
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)

  const handleDelete = async (id) => {
    await deletePost(id)
    navigate("/")
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
