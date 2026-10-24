import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppContent from "./AppContent";
beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});
test("selected work precedes experience and private email is not published", () => {
  const { container } = render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const sections = [...container.querySelectorAll("main > section")].map(
    (section) => section.id,
  );
  expect(sections).toEqual(["home", "projects", "experience", "contact"]);
  expect(container.textContent).not.toMatch(/georgeatki1@gmail/);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
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
