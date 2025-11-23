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
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostPage />} />
          {/* Use Component for components that don't need props */}
          <Route path="/about" Component={About} />
          <Route path="*" Component={Missing} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;
