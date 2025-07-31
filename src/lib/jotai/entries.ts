import { atom } from "jotai";

export interface IDictionaryEntry {
  id: number;
  word: string;
  explanation: string;
  pageNumber: number;
  volumeNumber: number;
  createdAt: Date;
}

export let entriesAtom = atom<unknown[]>([]);
