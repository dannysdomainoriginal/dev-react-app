import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import services from "./services";
import db from "../../data/db.json"

const PostStore = (set, get) => ({
  posts: db.posts,
  setPosts: (posts) => set({ posts }),

  postTitle: "",
  setPostTitle: (postTitle) => set({ postTitle }),

  postBody: "",
  setPostBody: (postBody) => set({ postBody }),

  editTitle: "",
  setEditTitle: (editTitle) => set({ editTitle }),

  editBody: "",
  setEditBody: (editBody) => set({ editBody }),

  search: "",
  setSearch: (search) => set({ search }),

  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),

  getPostCount: () => get().posts.length,

  getPostById: (id) => get().posts.find((post) => post.id === id),

  savePost: (newPost) => {
    set((state) => {
      const id = state.posts.length ? Number(state.posts[state.posts.length - 1].id) + 1 : 1
      state.posts.push({ id: String(id), ...newPost });
      state.postTitle = "";
      state.postBody = "";
    });
  },

  deletePost: (id) => {
    set((state) => {
      state.posts = state.posts.filter((p) => p.id !== id);
    });
  },

  editPost: (updatedPost) => {
    const { id, ...updates } = updatedPost;
    set((state) => {
      state.posts = state.posts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      );
      state.editTitle = "";
      state.editBody = "";
    });
  },

  ...services(set, get),
});

export const usePostStore = create(
  devtools(
    immer(
      persist(
        PostStore, // <-- wrap the whole store here
        {
          name: "ndjdndn:react-blog:persist-posts",
          partialize: (state) => ({ posts: state.posts })
        }
      )
    )
  )
);
