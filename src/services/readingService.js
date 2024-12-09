// src/services/readingService.js
import { apiFetch } from './api';

export const getUserReadings = async (userId) => {
  try {
    return await apiFetch(`http://localhost:8080/api/v1/reading/${userId}`);
  } catch (error) {
    console.error('Error al obtener la lista de lecturas:', error);
    throw error;
  }
};

export const createReadingList = async (userId) => {
  return await apiFetch(`/api/v1/readings`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
};
