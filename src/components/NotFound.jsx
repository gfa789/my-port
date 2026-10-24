import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found shell" tabIndex={-1}>
      <p className="eyebrow">404 / A little off course</p>
      <h1>
        This page could
        <br />
        <em>not be found.</em>
      </h1>
      <p>
        The link may have changed. You can explore my work from the portfolio.
      </p>
      <Link to="/" className="button button-primary">
        Back to portfolio <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
