import { atom } from "jotai";

import { IFavoriteEntry, IHistoryEntry, IResultsEntry } from "./interfaces";

export let searchTermAtom = atom("");

export let searchResultsAtom = atom<IResultsEntry[]>([]);

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
