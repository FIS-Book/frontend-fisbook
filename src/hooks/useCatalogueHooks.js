import { useState, useEffect } from 'react';
import axios from 'axios';
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
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/featured`);
        setFeaturedBooks(response);
      } catch (err) {
        console.error('Error al obtener los libros destacados:', err);
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`;
        if (isbn) {
          url = `${url}/isbn/${isbn}`;
        }
        const response = await requestWithAuth(url);
        setBooks(response);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los libros:', err);
        setError('No se pudo cargar los datos.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isbn]);

  return { books, loading, error };
};

// Custom hook to fetch the latest books from the API
export const useFetchLatestBooks = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/latest`);
        setLatestBooks(response);
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
        const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/stats`);
        setStats(response.data);
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
