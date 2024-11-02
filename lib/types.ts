export interface Joke {
  id: string;
  content: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  role: string;
}
