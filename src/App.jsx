import Header from "./partials/Header";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import Missing from "./pages/404";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAxiosFetch } from "./hooks";
import { useStoreActions, useStoreState } from "easy-peasy";

const App = () => {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch("/posts");
  const navigate = useNavigate()

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home  isLoading={isLoading} fetchError={fetchError} />}
        />
        <Route path="/post" element={<NewPost navigate={navigate} />} />
        <Route path="/edit/:id" element={<EditPost navigate={navigate} />} />
        <Route path="/posts/:id" element={<PostPage navigate={navigate} />} />
        {/* Use Component for components that don't need props */}
        <Route path="/about" Component={About} />
        <Route path="*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
