import { Rent } from "./rent";

export interface User {
    uid?: string,
    email?: string,
    rent?: Rent[] | undefined
  }