export interface Joke {
  _id: string; // Changed from id to _id to match MongoDB
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
