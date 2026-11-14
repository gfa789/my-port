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
  expect(sections).toEqual(["home", "experience", "projects", "contact"]);
  expect(container.querySelectorAll("#contact")).toHaveLength(1);
  expect(
    screen.getByRole("link", { name: "Explore OverWater" }),
  ).toHaveAttribute("href", "/overwater");
  expect(container.textContent).not.toMatch(/georgeatki1@gmail/);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).queryByRole("link", { name: "OverWater" }),
  ).not.toBeInTheDocument();
});
test("the project wheel wraps in both directions with keyboard and buttons", () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const deck = within(screen.getByRole("region", { name: "Browse projects" }));
  fireEvent.keyDown(screen.getByRole("region", { name: "Browse projects" }), {
    key: "ArrowUp",
  });
  expect(
    deck.getByRole("heading", { name: "Stereo Vision" }),
  ).toBeInTheDocument();
  fireEvent.click(deck.getByRole("button", { name: "Next project" }));
  expect(deck.getByRole("link", { name: "Explore OverWater" })).toHaveAttribute(
    "href",
    "/overwater",
  );
});

test("horizontal scroll rotates the project wheel and vertical scroll passes through", async () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const wheel = screen.getByRole("region", { name: "Browse projects" });
  const deck = within(wheel);
  const stage = wheel.querySelector(".project-wheel-stage");
  expect(fireEvent.wheel(stage, { deltaX: 12, deltaY: 120 })).toBe(true);
  expect(fireEvent.wheel(stage, { deltaX: 100 })).toBe(false);
  expect(
    deck.getByRole("link", { name: "Explore OverWater" }),
  ).toBeInTheDocument();
  await deck.findByRole("heading", { name: "ML for Weather Forecasting" });
  fireEvent.wheel(stage, { shiftKey: true, deltaY: -100 });
  expect(
    await deck.findByRole("link", { name: "Explore OverWater" }),
  ).toBeInTheDocument();
});

test("the hero presents all three personal photos together", () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const photos = within(screen.getByRole("group", { name: "Personal photos" }));
  expect(photos.getAllByRole("img")).toHaveLength(3);
  expect(
    photos.getByRole("img", { name: /friends at the beach/ }),
  ).toBeInTheDocument();
  const travel = photos.getByRole("button", { name: /coastal viewpoint/ });
  const beach = photos.getByRole("button", { name: /friends at the beach/ });
  fireEvent.click(travel);
  expect(travel).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(beach);
  expect(travel).toHaveAttribute("aria-pressed", "false");
  expect(beach).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(beach, { key: "Escape" });
  expect(beach).toHaveAttribute("aria-pressed", "false");
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
  fireEvent.keyDown(sliders[0], { key: "ArrowRight", shiftKey: true });
  fireEvent.keyDown(sliders[0], { key: "ArrowRight", shiftKey: true });
  expect(sliders[0]).toHaveAttribute(
    "aria-valuetext",
    "70% original, 30% enhanced",
  );
  container.querySelectorAll("video").forEach((video) => {
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
  });
  expect(screen.queryByText("About the project")).not.toBeInTheDocument();
  expect(
    screen.queryByText("Compare original and enhanced footage"),
  ).not.toBeInTheDocument();
});

test("the integrated playback control plays and pauses both comparison layers", async () => {
  const play = jest
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue();
  const pause = jest
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
  try {
    render(
      <MemoryRouter initialEntries={["/overwater"]}>
        <AppContent />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Play comparison 1" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Pause comparison 1" }),
      ).toBeInTheDocument(),
    );
    expect(play).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByRole("button", { name: "Pause comparison 1" }));
    expect(pause).toHaveBeenCalledTimes(2);
    expect(
      screen.getByRole("button", { name: "Play comparison 1" }),
    ).toBeInTheDocument();
  } finally {
    play.mockRestore();
    pause.mockRestore();
  }
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
