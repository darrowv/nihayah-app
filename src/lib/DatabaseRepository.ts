import { SQLiteDatabase } from "expo-sqlite";

import { IDictionaryEntry } from "./interfaces";
import { normalizeArabic } from "./utils/normalizeArabic";

export class DatabaseRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAllEntries() {
    let entries = await this.db.getAllAsync("SELECT * FROM dictionary_entries");

    return entries as IDictionaryEntry[];
  }

  async searchEntries(searchTerm: string) {
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
}
