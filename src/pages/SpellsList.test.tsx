import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import SpellsList from "./SpellsList";

test("spells list success load test", async () => {
  render(<SpellsList />);

  const spinner = screen.getByTestId("spinner");
  const noSpellsList = screen.queryByTestId("spells-list");

  expect(spinner).toBeInTheDocument();
  expect(noSpellsList).not.toBeInTheDocument();

  await waitForElementToBeRemoved(spinner, { timeout: 10000 });
  await waitFor(() => expect(spinner).not.toBeInTheDocument(), {
    timeout: 10000,
  });

  const spellsList = screen.getByTestId("spells-list");
  expect(spellsList).toBeInTheDocument();
});
