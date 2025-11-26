import api, { errHandler } from "../../../api";

const PostServices = (set, get) => ({
  savePostService: async (newPost) => {
    const { posts } = get();

    try {
      const res = await api.post("/posts", newPost);
      set({
        posts: [...posts, res.data],
        postTitle: "",
        postBody: "",
      });
    } catch (err) {
      errHandler(err);
    }
  },

  deletePostService: async (id) => {
    const { posts } = get();

    try {
      await api.delete(`/posts/${id}`);
      set({
        posts: posts.filter((p) => p.id !== id),
      });
    } catch (err) {
      errHandler(err);
    }
  },

  editPostService: async (updatedPost) => {
    const { posts } = get();
    const { id, ...updates } = updatedPost;

    try {
      const res = await api.put(`/posts/${id}`, updates);
      set({
        posts: posts.map((post) => (post.id === id ? res.data : post)),
        editTitle: "",
        editBody: "",
      });
    } catch (err) {
      errHandler(err);
    }
  },
});

export default PostServices