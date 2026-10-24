import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Home,
  History,
  FolderGit,
  Mail,
  ChevronRight,
  ChevronLeft,
  Waves,
  ArrowUp,
} from "lucide-react";
const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Timeline", icon: History },
  { id: "projects", label: "Projects", icon: FolderGit },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "overwater", label: "OverWater", icon: Waves },
];
export default function Sidebar() {
  const [open, setOpen] = useState(false),
    [wide, setWide] = useState(false),
    [active, setActive] = useState("home");
  const toggle = useRef(null),
    panel = useRef(null);
  const { pathname, hash } = useLocation();
  const previousLocation = useRef(pathname + hash);
  const reduce = useReducedMotion();
  useEffect(() => {
    const query = window.matchMedia?.("(min-width: 1400px)");
    if (!query) return;
    const update = () => {
      setWide(query.matches);
      setOpen(query.matches);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (previousLocation.current !== pathname + hash && !wide) setOpen(false);
    previousLocation.current = pathname + hash;
  }, [pathname, hash, wide]);
  useEffect(() => {
    const check = () => {
      if (pathname !== "/") return;
      let current = "home";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight * 0.4
        )
          current = item.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    if (!wide) panel.current?.querySelector("a")?.focus();
    const key = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab" && !wide) {
        const controls = [...panel.current.querySelectorAll("a,button")];
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, wide]);
  return (
    <>
      <button
        ref={toggle}
        className={`sidebar-toggle ${open ? "drawer-open" : ""}`}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="section-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        <span>Menu</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            {!wide && (
              <motion.button
                type="button"
                className="sidebar-scrim"
                aria-label="Close navigation backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setOpen(false);
                  toggle.current?.focus();
                }}
              />
            )}
            <motion.aside
              ref={panel}
              id="section-navigation"
              className="heritage-sidebar"
              role={wide ? "complementary" : "dialog"}
              aria-modal={wide ? undefined : true}
              aria-label="Explore my portfolio"
              initial={{ x: reduce ? 0 : -240, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduce ? 0 : -240, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            >
              <Link
                className="sidebar-top"
                to="/#home"
                aria-label="Back to top"
              >
                <ArrowUp size={20} />
              </Link>
              <nav aria-label="Section navigation">
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/#${item.id}`}
                        aria-current={
                          (pathname === "/" && active === item.id) ||
                          (pathname === "/overwater" && item.id === "overwater")
                            ? "location"
                            : undefined
                        }
                        onClick={() => {
                          if (!wide) setOpen(false);
                        }}
                      >
                        <item.icon size={19} aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <a className="sidebar-social" href="https://github.com/gfa789">
                GitHub ↗
              </a>
              <button
                className="sidebar-close"
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggle.current?.focus();
                }}
              >
                Close menu <ChevronLeft size={17} />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
