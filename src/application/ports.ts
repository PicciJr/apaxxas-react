import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';

export interface StorageService {
  getDocuments<T>(user: User, collection: string): Promise<T[]>;
  getDocument<T>(id: string, collection: string): Promise<T>;
  updateDocument(document: any, collection: string): void;
  createDocument(document: any, collection: string): void;
}

export interface UuidService {
  generateUuid(): string;
}
