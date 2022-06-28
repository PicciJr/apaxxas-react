import { Deposit } from '../domain/deposit';
import { User } from '../domain/user';

export interface StorageService {
  getDocuments(user: User, collection: string): Promise<any[]>;
  getDocument(id: string, collection: string): Promise<any>;
  updateDocument(document: any, collection: string): void;
  createDocument(document: any, collection: string): void;
}

export interface UuidService {
  generateUuid(): string;
}
