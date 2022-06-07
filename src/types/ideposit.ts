import { IUser } from './iuser';

export interface IDeposit {
  id: string;
  title: string;
  users: IUser[] | [];
}
