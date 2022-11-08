import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import SpellsList from "./SpellsList";
import testData from "../../test.data.json";

const spellDetail = testData.acid_arrow_details;
const spellName = testData.spells.results[0].name;

describe("Spells List test", () => {
  afterAll(cleanup);

  // Initial page load test is carried out App.test.tsx

  it("should load spells list.", async () => {
    render(<SpellsList />);
    await waitFor(() => {
      expect(screen.getByText(spellName)).toBeInTheDocument();
    });
  });

  it("should check if outline button changes to solid heart button when adding a spell to the favourites.", async () => {
    render(<SpellsList />);
    let favBtn: HTMLElement;
    await waitFor(() => {
      favBtn = screen.getByTestId("fav-btn-0");
    });
    expect(favBtn!).toBeInTheDocument();
    fireEvent.click(favBtn!);
    await waitFor(() => {
      expect(screen.getByTestId("fav-filled-icon")).toBeInTheDocument();
    });
  });

  it("should click a spell to view its details.", async () => {
    render(<SpellsList />);
    let spellTitle: HTMLElement;
    await waitFor(() => {
      spellTitle = screen.getByRole("heading", { name: spellName });
    });
    expect(spellTitle!).toBeInTheDocument();
    fireEvent.click(spellTitle!);
    await waitFor(() => {
      expect(screen.getByTestId("spell-detail-modal")).toBeInTheDocument();
    });
    expect(screen.getByText(spellDetail.desc[0])).toBeInTheDocument();
    expect(screen.getByText(spellDetail.higher_level[0])).toBeInTheDocument();
    expect(screen.getByText(spellDetail.range)).toBeInTheDocument();
  });
});
