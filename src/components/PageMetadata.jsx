import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { origin, pageMetadata } from "../seo";

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageMetadata(pathname);
    document.title = page.title;
    const tags = {
      description: page.description,
      robots: page.noindex ? "noindex, follow" : "index, follow",
      "og:title": page.title,
      "og:description": page.description,
      "og:type": "website",
      "og:site_name": "George Atkinson",
      "og:image": origin + page.image,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:url": page.path ? origin + page.path : "",
      "twitter:card": "summary_large_image",
      "twitter:title": page.title,
      "twitter:description": page.description,
      "twitter:image": origin + page.image,
    };
    Object.entries(tags).forEach(([name, content]) => {
      const attribute = name.startsWith("og:") ? "property" : "name";
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (page.path) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = origin + page.path;
    } else {
      canonical?.remove();
    }
  }, [pathname]);
  return null;
}
