import { ScanRecord } from '../types';
import { initDB } from './db';

export const getRecords = async (): Promise<ScanRecord[]> => {
  try {
    const db = await initDB();
    const records = await db.getAllFromIndex('records', 'by-date');
    return records.reverse(); // Newest first
  } catch (e) {
    console.error("Error reading from DB", e);
    return [];
  }
};

export const saveRecord = async (record: ScanRecord): Promise<void> => {
  try {
    const db = await initDB();
    await db.put('records', record);
  } catch (e) {
    console.error("Error saving to DB", e);
    alert("Error guardando el registro en la base de datos.");
  }
};

export const updateRecord = async (updatedRecord: ScanRecord): Promise<void> => {
  try {
    const db = await initDB();
    await db.put('records', updatedRecord);
  } catch (e) {
    console.error("Error updating record", e);
  }
};

export const deleteRecord = async (id: string): Promise<ScanRecord[]> => {
  try {
    const db = await initDB();
    await db.delete('records', id);
    return await getRecords();
  } catch (e) {
    console.error("Error deleting record", e);
    return [];
  }
};

export const importData = async (jsonString: string): Promise<boolean> => {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      const db = await initDB();
      const tx = db.transaction('records', 'readwrite');
      const store = tx.objectStore('records');

      // Clear existing? Or merge? Let's merge/overwrite based on ID
      for (const record of parsed) {
        await store.put(record);
      }
      await tx.done;
      return true;
    }
    return false;
  } catch (e) {
    console.error("Import error", e);
    return false;
  }
};

export const clearAllData = async (): Promise<void> => {
  const db = await initDB();
  await db.clear('records');
};