export interface Joke {
  _id: string;
  content: string;
  type: string;
  isModerated: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  role: string;
}
