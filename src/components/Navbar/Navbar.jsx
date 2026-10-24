import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Logo from "../Logo";
export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Main navigation">
        <Logo />
        <div className="header-actions">
          <Link className="button button-soft shine" to="/#contact">
            <span>Contact me</span>
            <Mail size={16} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
