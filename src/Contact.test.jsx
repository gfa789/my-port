import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("react-google-recaptcha", () => {
  const React = require("react");
  return React.forwardRef(({ asyncScriptOnLoad }, ref) => {
    React.useImperativeHandle(ref, () => ({
      executeAsync: async () => "test-token",
      reset: jest.fn(),
    }));
    React.useEffect(() => {
      asyncScriptOnLoad();
    }, [asyncScriptOnLoad]);
    return <span>Local test verification</span>;
  });
});
process.env.REACT_APP_CONTACT_ENABLED = "true";
process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";
const Contact = require("./components/Contact").default;

beforeEach(() => {
  global.fetch = jest.fn();
  AbortSignal.timeout = () => new AbortController().signal;
});
async function send() {
  render(<Contact />);
  fireEvent.change(screen.getByLabelText("Your email"), {
    target: { value: "visitor@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Your message"), {
    target: { value: "A local test enquiry about your work." },
  });
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Send message" }));
}
test("successful acknowledgement clears the form after the server response", async () => {
  global.fetch.mockResolvedValue({ ok: true, status: 202 });
  await send();
  expect(await screen.findByRole("status")).toHaveTextContent(
    "Your message has been received",
  );
  expect(screen.getByLabelText("Your email")).toHaveValue("");
  expect(global.fetch).toHaveBeenCalledWith(
    "/api/contact",
    expect.objectContaining({ method: "POST" }),
  );
});
test.each([
  [403, "Verification did not complete"],
  [429, "several messages"],
  [503, "service is unavailable"],
])(
  "server %s is shown accurately without clearing the draft",
  async (status, text) => {
    global.fetch.mockResolvedValue({ ok: false, status });
    await send();
    expect(await screen.findByRole("alert")).toHaveTextContent(text);
    expect(screen.getByLabelText("Your email")).toHaveValue(
      "visitor@example.com",
    );
  },
);
test("a network failure does not claim the message was received", async () => {
  global.fetch.mockRejectedValue(new Error("Connection unavailable"));
  await send();
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Connection unavailable",
  );
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
