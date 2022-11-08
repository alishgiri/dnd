import { rest } from "msw";
import { setupServer } from "msw/node";

// Polyfill "window.fetch" used in the React component.
import "whatwg-fetch";

// Extend Jest "expect" functionality with Testing Library assertions.
import "@testing-library/jest-dom";

const baseUrl = "https://www.dnd5eapi.co/api";

const spells = {
  count: 2,
  results: [
    {
      name: "Acid Arrow",
      index: "acid-arrow",
      url: "/api/spells/acid-arrow",
    },
    {
      name: "Acid Splash",
      index: "acid-splash",
      url: "/api/spells/acid-splash",
    },
  ],
};

const handlers = [
  rest.get(`${baseUrl}/spells`, (req, res, ctx) => {
    return res(ctx.json(spells), ctx.delay(200));
  }),
];

const server = setupServer(...handlers);

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth"
);
const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetHeight"
);

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    value: 600,
    configurable: true,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: 600,
  });

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetHeight",
    originalOffsetHeight
  );
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetWidth",
    originalOffsetWidth
  );

  server.close();
});
