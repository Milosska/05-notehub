import axios from "axios";
import type { Note, NewNote } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const PER_PAGE = 12;

const notehubAPIInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query: string = "",
): Promise<FetchNotesResponse> => {
  const response = await notehubAPIInstance.get("/notes", {
    params: {
      page,
      search: query,
      perPage: PER_PAGE,
    },
  });

  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await notehubAPIInstance.post("/notes", noteData);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await notehubAPIInstance.delete(`/notes/${noteId}`);

  return response.data;
};
