import { Spells } from "../models/Spells";
import axiosInstance from "./BaseSerivce";

const fetchSpells = async (): Promise<Spells> => {
  const res = await axiosInstance.get<Spells>("/spells");
  return res.data;
};

const DndService = {
  fetchSpells,
};

export default DndService;
