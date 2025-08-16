import { atom } from "jotai";

import { IDictionaryEntry, IFavoriteEntry, IHistoryEntry } from "./interfaces";

export let searchResultsAtom = atom<IDictionaryEntry[]>([]);

export let historyEntriesAtom = atom<IHistoryEntry[]>([]);

export let favoriteEntriesAtom = atom<IFavoriteEntry[]>([]);

export let removeFromFavoriteEntriesAtom = atom(
  null,
  (get, set, entryId: number) =>
    set(
      favoriteEntriesAtom,
      get(favoriteEntriesAtom).filter((entry) => entry.id !== entryId)
    )
);
