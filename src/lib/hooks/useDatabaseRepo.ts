import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { DatabaseRepository } from "../DatabaseRepository";

export const useDatabaseRepo = () => {
  const db = useSQLiteContext();
  return useMemo(() => new DatabaseRepository(db), [db]);
};
