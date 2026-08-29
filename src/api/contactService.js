import axios from 'axios';

import { BASE_URL } from '../utils/constants.js';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchContacts = async () => {
  const response = await api.get('');
  return response.data;
};
export const addContact = async (data) => {
  const response = await api.post('', data);
  return response.data;
};
export const deleteContact = async (id) => {
  const response = await api.delete(id);
  return response.data;
};
export const editContact = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};
