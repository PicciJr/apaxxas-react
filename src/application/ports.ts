import { Deposit } from '../domain/deposit';

export interface StorageService {
  deposit: Deposit;
  updateDeposit(deposit: Deposit): void;
}

// TODO
