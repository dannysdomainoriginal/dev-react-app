import { usePostStore } from "../store/posts";

const Footer = () => {
  const postCount = usePostStore((s) => s.getPostCount());

  return (
    <footer className="Footer">
      <p>Copyright &copy; Dannys Domain - {postCount} Blog Posts</p>
    </footer>
  );
};

export default Footer;
