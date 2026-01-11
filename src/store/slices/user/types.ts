/* ==================== Types ==================== */
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface UserState {
  userList: User | null;
  userSearchList: User | null;
  status: RequestStatus;
  error: string | null;
}

export interface UserCustom {
  userName?: string;
  name?: string;
  imageProfile?: string;
  imageUser?: string[];
  imageVDO?: string;
  atDate?: string;
  location?: string;
  music?: string;
  album?: string;
  albumImages?: string[];
}

/* User Types */
export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export type Gender = "male" | "female";
export type Role = "admin" | "user" | "moderator";

export interface UserItem extends UserCustom {
  userId: any;
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string; // ISO string
  image: string;

  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;

  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;

  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Role;
}

export interface User {
  limit: number;
  skip: number;
  total: number;
  users: UserItem[];
}
