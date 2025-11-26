import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePostStore } from "../store/posts";

const Nav = () => {
  const search = usePostStore((s) => s.search);
  const posts = usePostStore((s) => s.posts);
  const setSearch = usePostStore((s) => s.setSearch);
  const setSearchResults = usePostStore((s) => s.setSearchResults);

  useEffect(() => {
    const s = search.trim();
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(s.toLowerCase()) ||
        post.title.toLowerCase().includes(s.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          id="search"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="./">Home</Link>
        </li>
        <li>
          <Link to="./post">Post</Link>
        </li>
        <li>
          <Link to="./about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
