import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { useWindowSize } from "../hooks";

const Header = ({ title, navigate }) => {
  const { width } = useWindowSize();

  return (
    <header className="Header">
      <h1 onClick={() => navigate("/")}>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
