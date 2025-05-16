import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchHousesByQuery = async (name: string) => {
  const url = name.trim()
    ? `${API_BASE_URL}/houses/search?name=${encodeURIComponent(name)}`
    : `${API_BASE_URL}/houses`;

  const response = await axios.get(url);
  return response.data;
};
