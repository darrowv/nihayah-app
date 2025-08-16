export interface IDictionaryEntry {
  id: number;
  word: string;
  word_clean: string;
  explanation: string;
  explanation_clean: string;
  page_number: number;
  volume_number: number;
}

export interface IHistoryEntry extends IDictionaryEntry {
  entry_id: number;
  viewed_at: string;
}

export interface IFavoriteEntry extends IDictionaryEntry {
  entry_id: number;
}
