import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, FolderGit, History, Home, Mail } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: History },
  { id: "projects", label: "Projects", icon: FolderGit },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    function updateSection() {
      const remaining =
        document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY;
      if (window.scrollY > 0 && remaining <= 4) {
        setActive("contact");
        return;
      }

      const marker = window.innerHeight * 0.4;
      let current = "home";
      for (const { id } of items) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker)
          current = id;
      }
      setActive(current);
    }

    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, []);

  return (
    <aside className="heritage-sidebar" aria-label="Explore my portfolio">
      <Link className="sidebar-top" to="/#home" aria-label="Back to top">
        <ArrowUp size={20} aria-hidden="true" />
      </Link>
      <nav aria-label="Section navigation">
        <ul>
          {items.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <Link
                to={`/#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a className="sidebar-social" href="https://github.com/gfa789">
        GitHub ↗
      </a>
    </aside>
  );
}
