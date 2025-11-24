import Feed from "../components/Feed";
import { useStoreState } from "easy-peasy";

const Home = ({ isLoading, fetchError }) => {
  const posts = useStoreState((state) => state.searchResults)
  
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
