import axios from 'axios';

const API_KEY = '7CHIzBLxmUs5zFI2YUESzY45QZaOHVwUT0k53AaxzBW9EVAiQlAc45Eu';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
