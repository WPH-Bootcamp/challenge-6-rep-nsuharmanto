export const APIConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

console.log("DEBUG API KEY:", import.meta.env.VITE_API_KEY);
console.log("DEBUG BASE URL:", import.meta.env.VITE_BASE_URL);