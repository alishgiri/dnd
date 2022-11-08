import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "./App";

test("App should loads all routes and its contents.", async () => {
  render(<App />);

  // Test if home page is rendering
  expect(
    screen.getByText(/Welcome to Dungeons & Dragons!/i)
  ).toBeInTheDocument();

  // Test if "/spells" link is working
  const spellsNavLink = screen.getByRole("button", { name: /spells/i });
  expect(spellsNavLink).toBeInTheDocument();
  fireEvent.click(spellsNavLink);
  const spellsSpinner = screen.getByTestId("spinner");
  expect(spellsSpinner).toBeInTheDocument();
  await waitForElementToBeRemoved(spellsSpinner);
  expect(spellsSpinner).not.toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
  });

  // Test if "/favourites" link is working
  const favNavLink = screen.getByRole("button", { name: /favourites/i });
  expect(favNavLink).toBeInTheDocument();
  fireEvent.click(favNavLink);
  const favSpinner = screen.getByTestId("spinner");
  await waitForElementToBeRemoved(favSpinner);
  expect(screen.getByText(/List is empty!/i)).toBeInTheDocument();
});
