import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Logo />
        <p>George Atkinson · Software Engineer</p>
        <nav aria-label="Social links">
          <a href="https://github.com/gfa789">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href="https://linkedin.com/in/georgeatki">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
