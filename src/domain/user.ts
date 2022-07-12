import { Deposit } from './deposit';

export type User = {
  id: string;
  deposits?: Deposit[] | [];
  name: string;
  alias: string;
};
