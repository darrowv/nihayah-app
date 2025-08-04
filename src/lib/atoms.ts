import { atom } from "jotai";

import { IDictionaryEntry } from "./interfaces";

export let dictionaryEntriesAtom = atom<IDictionaryEntry[]>([]);
