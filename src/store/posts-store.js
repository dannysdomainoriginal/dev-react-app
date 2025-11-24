import { createStore, action, thunk, computed } from "easy-peasy";
import api, { errHandler } from "../api";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find(post => post.id === id)
  }),

  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState()

    try {
      const res = await api.post("/posts", newPost);
      actions.setPosts([...posts, res.data]);
      actions.setPostTitle("")
      actions.setPostBody("")
    } catch (err) {
      errHandler(err);
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState()

    try {
      await api.delete(`/posts/${id}`);
      actions.setPosts(posts.filter((p) => p.id !== id))
    } catch (err) {
      errHandler(err);
    }
  }),
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState()
    const { id, ...updates } = updatedPost

    try {
      const res = await api.put(`/posts/${id}`, updates);
      actions.setPosts(posts.map((post) => (post.id === id ? res.data : post)));
      actions.setEditTitle("")
      actions.setEditBody("")
    } catch (err) {
      errHandler(err);
    }
  }),

});