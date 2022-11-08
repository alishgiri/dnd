import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "./App";
import testData from "../test.data.json";

const spellName = testData.spells.results[0].name;

describe("App should loads all routes and its contents.", () => {
  afterEach(cleanup);

  it("should render home page", () => {
    render(<App />);
    expect(
      screen.getByText(/Welcome to Dungeons & Dragons!/i)
    ).toBeInTheDocument();
  });

  it("should open '/spells' nav link", async () => {
    render(<App />);
    const spellsNavLink = screen.getByRole("button", { name: /spells/i });
    expect(spellsNavLink).toBeInTheDocument();
    fireEvent.click(spellsNavLink);
    const spellsSpinner = screen.getByTestId("spinner");
    expect(spellsSpinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spellsSpinner);
    expect(spellsSpinner).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(spellName)).toBeInTheDocument();
    });
  });

  it("should open '/favourites' nav link", async () => {
    render(<App />);
    const favNavLink = screen.getByRole("button", { name: /favourites/i });
    expect(favNavLink).toBeInTheDocument();
    fireEvent.click(favNavLink);
    const favSpinner = screen.getByTestId("spinner");
    await waitForElementToBeRemoved(favSpinner);
    expect(screen.getByText(/List is empty!/i)).toBeInTheDocument();
  });
});
