import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const beGet = async (url, config) => {
  try {
    const result = await api.get(url, config);
    return result;
  } catch (error) {
    return error;
  }
};

const bePost = async (url, data, config) => {
  try {
    const result = await api.post(url, data, config);
    return result;
  } catch (error) {
    return error;
  }
};

export {
  beGet,
  bePost,
};
