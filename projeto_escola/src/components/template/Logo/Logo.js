import "./Logo.css";
import logo from "../../../assets/images/logo_escola.png";

export default function Logo(props) {
  return (
    <>
      <aside className="logo">
        <a href="/" className="logo">
          <img src={logo} alt="Logo" />
        </a>
      </aside>
    </>
  );
}
