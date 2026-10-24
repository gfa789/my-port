import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppContent from "./AppContent";
beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});
test("the original journey layout retains private contact details and one main heading", () => {
  const { container } = render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const sections = [...container.querySelectorAll("main > section")].map(
    (section) => section.id,
  );
  expect(sections).toEqual([
    "home",
    "experience",
    "projects",
    "contact",
    "overwater",
  ]);
  expect(container.querySelectorAll("#contact")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "OverWater-UIE", level: 2 }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /OverWater/ })[0]).toHaveAttribute(
    "href",
    "/#overwater",
  );
  expect(container.textContent).not.toMatch(/georgeatki1@gmail/);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).queryByRole("link", { name: "OverWater" }),
  ).not.toBeInTheDocument();
});
test("the entire page palette switches at OverWater and restores on scrolling back", () => {
  const { container } = render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const page = container.querySelector(".portfolio-page");
  const section = container.querySelector("#overwater");
  let top = 900;
  section.getBoundingClientRect = () => ({ top });
  fireEvent.scroll(window);
  expect(page).not.toHaveClass("water-theme");
  top = 100;
  fireEvent.scroll(window);
  expect(page).toHaveClass("water-theme");
  top = 900;
  fireEvent.scroll(window);
  expect(page).not.toHaveClass("water-theme");
});

test("the carousel retains every slide and waits for the incoming image before switching", async () => {
  const { container } = render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("region", { name: "Personal photos" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Show next photo" }));
  expect(screen.getByRole("button", { name: "Show photo 1" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const images = container.querySelectorAll(".carousel-window img");
  expect(images).toHaveLength(3);
  Object.defineProperty(images[1], "naturalWidth", { value: 960 });
  fireEvent.load(images[1]);
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Show photo 2" }),
    ).toHaveAttribute("aria-pressed", "true"),
  );
  expect(container.querySelectorAll(".carousel-window img")[0]).toBe(images[0]);
  expect(screen.getByRole("button", { name: "Show photo 2" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
  expect(
    screen.getByRole("button", { name: "Play slideshow" }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("menu exposes state, closes on Escape and restores focus", () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const toggle = screen.getByRole("button", { name: /menu/i });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});
test("OverWater comparison responds to keyboard-compatible range values without autoplay", () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/overwater"]}>
      <AppContent />
    </MemoryRouter>,
  );
  const sliders = screen.getAllByRole("slider");
  fireEvent.change(sliders[0], { target: { value: "70" } });
  expect(sliders[0]).toHaveAttribute(
    "aria-valuetext",
    "70% original, 30% enhanced",
  );
  container.querySelectorAll("video").forEach((video) => {
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
  });
});
test("unknown routes provide a useful recovery link", () => {
  render(
    <MemoryRouter initialEntries={["/missing"]}>
      <AppContent />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("link", { name: /back to portfolio/i }),
  ).toHaveAttribute("href", "/");
});
