import axios from "axios";

const DELIVER_API = "http://localhost:3001/api";
const MODERATE_API = "http://localhost:3002/api";
const SUBMIT_API = "http://localhost:3003/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const { data } = await axios.post(`${MODERATE_API}/auth/login`, {
      email,
      password,
    });
    return data;
  },

  // Public Jokes
  getRandomJoke: async () => {
    const { data } = await axios.get(`${DELIVER_API}/jokes/random`);
    return data;
  },

  submitJoke: async (joke: { content: string; type: string }) => {
    const { data } = await axios.post(`${SUBMIT_API}/jokes`, joke);
    return data;
  },

  // Moderation
  getUnmoderatedJoke: async () => {
    const { data } = await axios.get(`${MODERATE_API}/jokes/next`, {
      headers: getAuthHeader(),
    });
    return data;
  },

  approveJoke: async (id: string, joke: { content: string; type: string }) => {
    const { data } = await axios.post(
      `${MODERATE_API}/jokes/${id}/approve`,
      joke,
      { headers: getAuthHeader() }
    );
    return data;
  },

  rejectJoke: async (id: string) => {
    const { data } = await axios.post(
      `${MODERATE_API}/jokes/${id}/reject`,
      {},
      { headers: getAuthHeader() }
    );
    return data;
  },

  getJokeTypes: async () => {
    const { data } = await axios.get(`${DELIVER_API}/jokes/types`);
    return data;
  },
};
