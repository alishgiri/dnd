export interface Spells {
  count: number;
  results: Array<Spell>;
}

export interface Spell {
  url: string;
  name: string;
  index: string;
}
