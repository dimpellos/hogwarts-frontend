import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';


export const fetchHousesByQuery = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/houses/search?query=${query}`);
  return response.data;
};
