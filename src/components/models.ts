export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface LogIn {
  userName: string;
  password: string;
}

export interface RawData {
  Date: string;
  Magnitute: number;
  Latitute: number;
  Longitute: number;
  Center: string;
}
export interface Series {
  dateUtc: Date;
  magnitude: number;
}

export interface ResSeries {
  x: Date;
  y: number;
}
