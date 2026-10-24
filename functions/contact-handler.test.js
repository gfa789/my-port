const test = require("node:test");
const assert = require("node:assert/strict");
const {createContactHandler} = require("./contact-handler");
async function request({
  body = {
    email: "visitor@example.com",
    message: "Hello, I would like to discuss your work.",
    token: "valid",
  },
  method = "POST",
  verify = true,
  ready = true,
  saveError = null,
} = {}) {
  const saved = [];
  const handler = createContactHandler({
    configured: () => ready,
    verifyToken: async () => verify,
    saveMessage: async (message) => {
      if (saveError) throw saveError;
      saved.push(message);
    },
  });
  const res = {
    headers: {},
    set(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
  await handler(
    {
      method,
      body,
      is: (type) => type === "application/json",
      ip: "127.0.0.1",
    },
    res,
  );
  return {...res, saved};
}
test("validated submission is stored and acknowledged only after storage", async () => {
  const result = await request();
  assert.equal(result.code, 202);
  assert.equal(result.saved.length, 1);
  assert.equal(result.body.received, true);
});
test("invalid input and failed CAPTCHA never store a message", async () => {
  assert.equal((await request({body: {email: "invalid"}})).code, 400);
  const denied = await request({verify: false});
  assert.equal(denied.code, 403);
  assert.equal(denied.saved.length, 0);
});
test("rate limits are distinct from database failures", async () => {
  assert.equal((await request({saveError: {code: "rate-limit"}})).code, 429);
  assert.equal(
    (await request({saveError: {code: "permission-denied"}})).code,
    503,
  );
});
test("missing configuration and unsupported methods fail explicitly", async () => {
  assert.equal((await request({ready: false})).code, 503);
  assert.equal((await request({method: "GET"})).code, 405);
});
