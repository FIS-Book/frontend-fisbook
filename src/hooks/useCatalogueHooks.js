/* This hook provides utility functions to fetch data from the API related to the catalogue of books. */

import { useState, useEffect } from 'react';
import languageMap from '../utils/languageMap';
import { requestWithAuth } from './useAuth';

// Custom hook to fetch featured books from the API
export const useFetchFeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/featured`,
          {
            method: 'GET',
          }
        );
        if (response && Array.isArray(response) && response.length > 0) {
          setFeaturedBooks(response);
        } else {
          throw new Error("No se encontraron libros destacados.");
        }
      } catch (err) {
        console.error('Error al obtener los libros destacados: Error code - ', err);
        setError('No se pudo cargar los libros destacados.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return { featuredBooks, loading, error };
};

// Custom hook to get books from the API, optionally by ISBN
export const useFetchBooks = (isbn = null) => {
  const [books, setBooks] = useState(isbn ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`;
      if (isbn) {
        url = `${url}/isbn/${isbn}`;
      }
      const response = await requestWithAuth(url,
        {
          method: 'GET',
        }
      );
      console.log("Books by ISBN: ");
      console.log(response);
      if (response && ((Array.isArray(response) && response.length > 0) || (typeof response === 'object' && response.hasOwnProperty('isbn')))) {
        setBooks(response);
        setLoading(false);
      } else {
        throw new Error("No se encontraron libros.");
      }

    } catch (err) {
      console.error('Error al obtener los libros: Error code - ', err);
      setError('No se pudo cargar los datos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [isbn]);

  return { books, loading, error, refetch: fetchBooks };
};

// Custom hook to fetch the latest books from the API
export const useFetchLatestBooks = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/latest`,
          {
            method: 'GET',
          }
        );
        console.log("Latest books response: ");
        console.log(response);
        if(response && Array.isArray(response) && response.length > 0){
          setLatestBooks(response);
        } else {
          throw new Error("No se encontraron libros recientes.");
        }
      } catch (err) {
        console.error('Error al obtener los libros recientes:', err);
        setError('No se pudo cargar los libros recientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return { latestBooks, loading, error };
};

// Custom hook to fetch stats from the API
export const useFetchStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/stats`,
          {
            method: 'GET',
          }
        );
        console.log("Stats response: ");
        console.log(response);
        if (response.success === true) {
          setStats(response.data);
        } else {
          throw new Error("No se encontraron estadísticas.");
        }
      } catch (err) {
        console.error('Error al obtener estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

// Custom hook to filter books based on search term and filter by
export const useFilteredBooks = (books, searchTerm, filterBy) => {
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((book) => {
          if (filterBy === 'categories') {
            return book.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          if (filterBy === 'publicationYear') {
            return book.publicationYear?.toString().includes(searchTerm);
          }
          if (filterBy === 'language') {
            return languageMap[book.language].toLowerCase().includes(searchTerm.toLowerCase());
          }
          return (
            book[filterBy] &&
            book[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }
  }, [books, searchTerm, filterBy]);

  return filteredBooks;
};
