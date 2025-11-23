import { openDB, DBSchema } from 'idb';
import { ScanRecord } from '../types';

interface ScannerDB extends DBSchema {
    records: {
        key: string;
        value: ScanRecord;
        indexes: { 'by-date': number };
    };
}

const DB_NAME = 'industrial-scanner-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<ScannerDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('records')) {
                const store = db.createObjectStore('records', { keyPath: 'id' });
                store.createIndex('by-date', 'timestamp');
            }
        },
    });
};
