import { SQLiteDatabase } from "expo-sqlite";

import { IDictionaryEntry, IFavoriteEntry, IHistoryEntry } from "./interfaces";
import { normalizeArabic } from "./utils/normalizeArabic";

export class DatabaseRepository {
  constructor(private db: SQLiteDatabase) {}

  // dictionary entries methods
  async searchDictEntries(searchTerm: string) {
    let normalizedSearchTerm = normalizeArabic(searchTerm);
    let value = `%${normalizedSearchTerm}%`;

    let filteredEntries = await this.db.getAllAsync(
      `
        SELECT * FROM dictionary_entries
        WHERE word_clean LIKE ? OR explanation_clean LIKE ?
        ORDER BY
          CASE
            WHEN word_clean = ? THEN 1             -- exact match
            WHEN word_clean LIKE ? THEN 2          -- starts with
            WHEN word_clean LIKE ? THEN 3          -- contains
            WHEN explanation_clean LIKE ? THEN 4   -- found in explanation
            ELSE 5
          END,
          word_clean ASC
        `,
      [
        value, // word_clean LIKE ?
        value, // explanation_clean LIKE ?
        normalizedSearchTerm, // word_clean = ?
        normalizedSearchTerm + "%", // word_clean LIKE 'input%'
        "%" + normalizedSearchTerm + "%", // word_clean LIKE '%input%'
        "%" + normalizedSearchTerm + "%", // explanation_clean LIKE '%input%'
      ]
    );

    return filteredEntries as IDictionaryEntry[];
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
    const entries = await this.db.getAllAsync(
      `
      SELECT de.*, h.viewed_at
      FROM history h
      JOIN dictionary_entries de ON de.id = h.entry_id
      ORDER BY h.viewed_at DESC
      `
    );

    return entries as IHistoryEntry[];
  }

  // favorites methods
  async getDictEntriesFromFavorites() {
    const entries = await this.db.getAllAsync(
      `
      SELECT de.*, f.entry_id
      FROM favorites f
      JOIN dictionary_entries de ON de.id = f.entry_id
      ORDER BY de.word COLLATE NOCASE
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
    const result = await this.db.getAllAsync(
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
