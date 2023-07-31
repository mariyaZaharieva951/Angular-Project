import { Rent } from "../auth/profile/profile.component";

export interface User {
    uid?: string,
    email?: string,
    rent?: Rent
  }