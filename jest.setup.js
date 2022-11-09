import { rest } from "msw";
import { setupServer } from "msw/node";

// Extend Jest "expect" functionality with Testing Library assertions.
import "@testing-library/jest-dom";

import testData from "./test.data.json";

const baseUrl = "https://www.dnd5eapi.co/api";

const handlers = [
  rest.get(`${baseUrl}/spells`, (req, res, ctx) => {
    return res(ctx.json(testData.spells), ctx.delay(200));
  }),
  rest.get(`${baseUrl}/spells/acid-arrow`, (req, res, ctx) => {
    return res(ctx.json(testData.acid_arrow_details), ctx.delay(200));
  }),
];

const server = setupServer(...handlers);

// These are necessary for AutoSizer from
// "react-virtualized-auto-sizer" to work
//
// These will set the initial heigh and width of the <AutoSizer />
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
