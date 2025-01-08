// src/services/api.js

export const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };
  