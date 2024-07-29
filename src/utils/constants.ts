export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://tasks-restfull-api.vercel.app/v1/api/"
    : "http://localhost:4001/v1/api/";

export const CONTENT_TYPE = "Content-Type";
export const CONTENT_TYPE_VALUE = "application/json";
