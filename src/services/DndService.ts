import axiosInstance from "./BaseSerivce";
import { Spell, Spells } from "../models/Spells";
import { SpellDetail } from "../models/SpellDetail";

let favouritesFromDatabase: Spell[] = [];

const fetchSpells = async (): Promise<Spells> => {
  const res = await axiosInstance.get<Spells>("/api/spells");

  // Highlight favourite items
  if (favouritesFromDatabase.length > 0) {
    favouritesFromDatabase.forEach((fav) => {
      res.data.results.map((item) => {
        if (item.name === fav.name) {
          item.isFav = true;
        }
        return item;
      });
    });
  }

  return res.data;
};

const fetchFavouriteSpells = async (): Promise<Spell[]> => {
  // Make API request to get Favourite spells
  return Promise.resolve(favouritesFromDatabase);
};

const addSpellToFav = async (spell: Spell): Promise<boolean> => {
  // Call API to store the favourite spell
  favouritesFromDatabase.push(spell);
  return Promise.resolve(true);
};

const removeSpellFromFav = async (spell: Spell): Promise<boolean> => {
  // Call API to remove the favourite spell
  favouritesFromDatabase = favouritesFromDatabase.filter(
    (s: Spell) => s.name !== spell.name
  );
  return Promise.resolve(true);
};

const fetchSpellDetails = async (endPoint: string): Promise<SpellDetail> => {
  const res = await axiosInstance.get<SpellDetail>(endPoint);
  return res.data;
};

const DndService = {
  fetchSpells,
  addSpellToFav,
  fetchSpellDetails,
  removeSpellFromFav,
  fetchFavouriteSpells,
};

export default DndService;
