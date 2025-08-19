import { SQLiteDatabase } from "expo-sqlite";

import {
  IDictionaryEntry,
  IFavoriteEntry,
  IHistoryEntry,
  IResultsEntry,
} from "./interfaces";
import { normalizeArabic } from "./utils/normalizeArabic";

export class DatabaseRepository {
  constructor(private db: SQLiteDatabase) {}

  // dictionary entries methods
  async getDictEntryById(entryId: number) {
    let entry = await this.db.getFirstAsync(
      `
        SELECT * FROM dictionary_entries
        WHERE id = ?
      `,
      [entryId]
    );

    return entry as IDictionaryEntry;
  }

  async searchDictEntries(searchTerm: string) {
    let normalizedSearchTerm = normalizeArabic(searchTerm);
    let likeValue = `%${normalizedSearchTerm}%`;

    let results = await this.db.getAllAsync(
      `
      SELECT *,
        CASE
          WHEN word_clean LIKE ? THEN 'word'
          ELSE 'explanation'
        END AS match_type
      FROM dictionary_entries
      WHERE word_clean LIKE ?
         OR explanation_clean LIKE ?
      ORDER BY
        CASE
          -- Word matches first
          WHEN word_clean = ? THEN 1
          WHEN word_clean LIKE ? THEN 2
          WHEN word_clean LIKE ? THEN 3
          -- Explanation matches last
          ELSE 4
        END,
        word_clean ASC
      `,
      [
        // CASE for match_type
        likeValue,

        // WHERE clause
        likeValue,
        likeValue,

        // ORDER BY priorities
        normalizedSearchTerm, // exact match
        normalizedSearchTerm + "%", // prefix match
        likeValue, // contains match
      ]
    );

    return results as IResultsEntry[];
  }

  // history methods
  async addEntryToHistory(entryId: number) {
    await this.db.runAsync(
      `
      INSERT INTO history (entry_id, viewed_at)
      VALUES (?, CURRENT_TIMESTAMP)
      ON CONFLICT(entry_id) DO UPDATE SET viewed_at = CURRENT_TIMESTAMP;
      `,
      entryId
    );

    // Delete oldest entries, keeping only 50 most recent ones
    await this.db.runAsync(
      `
      DELETE FROM history
      WHERE id NOT IN (
        SELECT id FROM history
        ORDER BY viewed_at DESC
        LIMIT 50
      );
      `
    );
  }

  async getDictEntriesFromHistory() {
    let entries = await this.db.getAllAsync(
      `
      SELECT de.*, h.viewed_at, h.entry_id
      FROM history h
      JOIN dictionary_entries de ON de.id = h.entry_id
      ORDER BY h.viewed_at DESC
      `
    );

    return entries as IHistoryEntry[];
  }

  // favorites methods
  async getDictEntriesFromFavorites() {
    let entries = await this.db.getAllAsync(
      `
      SELECT de.*, f.added_at, f.entry_id
      FROM favorites f
      JOIN dictionary_entries de ON de.id = f.entry_id
      ORDER BY de.added_at DESC
      `
    );

    return entries as IFavoriteEntry[];
  }

  async addEntryToFavorites(entryId: number) {
    await this.db.runAsync(
      `
      INSERT INTO favorites (entry_id)
      VALUES (?)
      ON CONFLICT(entry_id) DO NOTHING;
      `,
      entryId
    );
  }

  async removeEntryFromFavorites(entryId: number) {
    await this.db.runAsync(
      `
      DELETE FROM favorites
      WHERE entry_id = ?;
      `,
      entryId
    );
  }

  async isEntryInFavorites(entryId: number) {
    let result = await this.db.getAllAsync(
      `
      SELECT 1
      FROM favorites
      WHERE entry_id = ?
      LIMIT 1;
      `,
      [entryId]
    );

    return result.length > 0;
  }
}
