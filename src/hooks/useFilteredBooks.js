// Custom hook to filter books based on search term and filter by
import { useState, useEffect } from 'react';
import languageMap from '../utils/languageMap';

const useFilteredBooks = (books, searchTerm, filterBy) => {
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

export default useFilteredBooks;
