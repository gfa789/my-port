import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="brand" aria-label="George Atkinson — home">
      <span className="monogram" aria-hidden="true">
        <i>g</i>A<span>.</span>
      </span>
      <span className="brand-name">George Atkinson</span>
    </Link>
  );
}
