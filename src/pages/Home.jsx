import Feed from "../components/Feed";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {
  const { searchResults: posts, fetchError, isLoading } = useContext(DataContext)
  
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
