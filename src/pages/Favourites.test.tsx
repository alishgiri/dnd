import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import SpellsList from "./SpellsList";
import Favourites from "./Favourites";

describe("Favourites: Add and remove a spell.", () => {
  afterEach(cleanup);

  it("should add one spell to favourites from '/spells' page", async () => {
    render(<SpellsList />);
    await waitFor(() => {
      expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("fav-btn-0"));
    await waitFor(() => {
      expect(screen.getByTestId("fav-filled-icon")).toBeInTheDocument();
    });
  });

  it("should verify added favourite item & remove it.", async () => {
    render(<Favourites />);
    await waitFor(() => {
      expect(screen.getByText("Acid Arrow")).toBeInTheDocument();
    });
    expect(screen.getByTestId("fav-filled-icon")).toBeInTheDocument();
    const favBtn = screen.getByTestId("fav-btn-0");
    expect(favBtn).toBeInTheDocument();
    fireEvent.click(favBtn);
    await waitFor(() => {
      expect(screen.getByText(/List is empty!/i)).toBeInTheDocument();
    });
  });
});
