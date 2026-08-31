import axios from "axios";
import type { DiaryEntry, DiaryEntryForm } from "../types.ts";

const baseUrl = "/api/diaries";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (newObject: DiaryEntryForm): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, newObject);
  return response.data;
};
export default {
  getAll,
  create,
};
