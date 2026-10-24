import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const nav = useRef(null);
  const { pathname } = useLocation();
  const onProject = pathname.startsWith("/overwater");
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (!nav.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);
  const links = (
    <>
      <Link to="/#projects" onClick={() => setOpen(false)}>
        Work
      </Link>
      <Link to="/#experience" onClick={() => setOpen(false)}>
        Experience
      </Link>
      <Link
        to="/overwater"
        aria-current={onProject ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        OverWater
      </Link>
      <Link
        to="/#contact"
        className="nav-contact"
        onClick={() => setOpen(false)}
      >
        Get in touch <span aria-hidden="true">↗</span>
      </Link>
    </>
  );
  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Main navigation" ref={nav}>
        <Logo />
        <div className="desktop-links">{links}</div>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        {open && (
          <div id="mobile-navigation" className="mobile-links">
            {links}
          </div>
        )}
      </nav>
    </header>
  );
}
