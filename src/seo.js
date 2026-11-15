import { projectRoutes } from "./projectRoutes";
import { studies } from "./pages/ProjectStudy/studies";

export const origin = "https://georgeatkinson.co.uk";
export function pageMetadata(pathname) {
  const match = Object.entries(projectRoutes).find(
    ([, route]) => route === pathname.replace(/\/$/, ""),
  );
  if (match) {
    const [id, path] = match;
    return {
      title: studies[id].title + " | George Atkinson",
      description: studies[id].description,
      path,
      image: "/social/" + id + ".png",
    };
  }
  if (pathname === "/")
    return {
      title: "George Atkinson | Software Engineer",
      description:
        "George Atkinson is a software engineer working across .NET, Python, React and SQL in reference data technology. Explore his work, experience and machine learning projects.",
      path: "/",
      image: "/social/portfolio.png",
    };
  return {
    title: "Page not found | George Atkinson",
    description: "Find your way back to George Atkinson’s portfolio.",
    path: null,
    image: "/social/portfolio.png",
    noindex: true,
  };
}
