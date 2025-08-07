import { atom } from "jotai";

import { IDictionaryEntry, IHistoryEntry } from "./interfaces";

export let searchResultsAtom = atom<IDictionaryEntry[]>([]);

export let historyEntriesAtom = atom<IHistoryEntry[]>([]);
