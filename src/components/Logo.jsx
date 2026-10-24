import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label="George Atkinson — home">
      <span className="monogram" aria-hidden="true">
        <i>g</i>
        <b>A</b>
        <span className="logo-shine" />
      </span>
    </Link>
  );
}
