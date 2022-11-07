import { SpellDetail } from "./SpellDetail";

export interface Spells {
  count: number;
  results: Array<Spell>;
}

export interface Spell {
  url: string;
  name: string;
  index: string;
  detail?: SpellDetail;
  isFav: boolean | null;
}
