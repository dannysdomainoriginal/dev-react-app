import Feed from "../components/Feed";
import { usePostStore } from "../store/posts";

const Home = ({ isLoading, fetchError }) => {
  const posts = usePostStore((s) => s.searchResults)
  
  return (
    <main className="Home">
      {isLoading ? (
        <p className="statusMsg">Loading posts...</p>
      ) : fetchError ? (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      ) : posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts available</p>
      )}
    </main>
  );
};

export default Home;
