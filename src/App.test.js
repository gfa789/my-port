import { render, screen, fireEvent, within } from "@testing-library/react";
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
    screen.getByRole("link", {
      name: "View project: Underwater Image Enhancement",
    }),
  ).toHaveAttribute("href", "/projects/underwater-image-enhancement");
  expect(container.textContent).not.toMatch(/georgeatki1@gmail/);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(
    within(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).queryByRole("link", { name: "Underwater Image Enhancement" }),
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
  expect(
    deck.getByRole("link", {
      name: "View project: Underwater Image Enhancement",
    }),
  ).toHaveAttribute("href", "/projects/underwater-image-enhancement");
});

test("a project image opens its own case study", () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>,
  );
  const preview = screen.getByRole("link", {
    name: "Open Weather Forecasting",
  });
  expect(preview).toHaveAttribute("href", "/projects/weather-forecasting");
  expect(preview.querySelector("img")).toHaveAttribute(
    "src",
    "/projects/previews/weather-forecasting.webp",
  );
  fireEvent.click(preview);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Weather Forecasting",
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
    deck.getByRole("link", {
      name: "View project: Underwater Image Enhancement",
    }),
  ).toBeInTheDocument();
  await deck.findByRole("heading", { name: "ML for Weather Forecasting" });
  fireEvent.wheel(stage, { shiftKey: true, deltaY: -100 });
  expect(
    await deck.findByRole("link", {
      name: "View project: Underwater Image Enhancement",
    }),
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
test("the dive log keeps both diagrams visible and plays both clips on sight", async () => {
  const previousObserver = window.IntersectionObserver;
  const observed = new Map();
  window.IntersectionObserver = class {
    constructor(notify) {
      this.notify = notify;
    }
    observe(element) {
      observed.set(element, this.notify);
    }
    disconnect() {}
  };
  const play = jest
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue();
  const pause = jest
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
  try {
    const { container, unmount } = render(
      <MemoryRouter initialEntries={["/projects/underwater-image-enhancement"]}>
        <AppContent />
      </MemoryRouter>,
    );
    const log = screen.getByRole("region", { name: "Dive log" });
    const clips = container.querySelector(".dive-frames");
    const videos = Array.from(clips.querySelectorAll("video"));
    expect(videos.every((video) => video.muted && video.loop)).toBe(true);
    expect(play).not.toHaveBeenCalled();
    expect(
      within(log).getByRole("img", { name: /Illustrative RGB curves/ }),
    ).toBeVisible();
    expect(
      within(log).getByRole("img", { name: /schematic of two experiments/ }),
    ).toBeVisible();
    expect(
      within(log).queryByRole("button", { name: /play/i }),
    ).not.toBeInTheDocument();

    observed.get(clips)([{ isIntersecting: true, intersectionRatio: 1 }]);
    expect(play).toHaveBeenCalledTimes(2);
    videos.forEach((video) =>
      Object.defineProperty(video, "paused", { get: () => false }),
    );
    observed.get(clips)([{ isIntersecting: false, intersectionRatio: 0 }]);
    expect(pause).toHaveBeenCalledTimes(2);
    unmount();
  } finally {
    window.IntersectionObserver = previousObserver;
    play.mockRestore();
    pause.mockRestore();
  }
});
test("all three ML experiments are in the page and link to adjacent projects", () => {
  render(
    <MemoryRouter initialEntries={["/projects/model-analysis"]}>
      <AppContent />
    </MemoryRouter>,
  );
  const navigation = screen.getByRole("navigation", {
    name: "Browse project pages",
  });
  expect(
    within(navigation).getByRole("link", { name: /previous project/i }),
  ).toHaveAttribute("href", "/projects/weather-forecasting");
  expect(
    within(navigation).getByRole("link", { name: /next project/i }),
  ).toHaveAttribute("href", "/projects/dartboard-detector");
  for (const name of [
    "PCA and kernels",
    "Activity recognition",
    "Bayesian regression",
  ]) {
    expect(screen.getByRole("heading", { name, level: 2 })).toBeVisible();
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
