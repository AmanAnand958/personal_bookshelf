import React, { useEffect, useState, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CardSlider from './CardSlider';
import './loader.css'

const BookSearchPage = ({ books, setBooks, searched, setSearched, addToBookshelf }) => {
  const [loading, setLoading] = useState(false);
  const currentPage = useRef(1);

  const searchBooks = async (query) => {
    if (query.length === 0) {
      setBooks([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
    const data = await response.json();
    setBooks(data.docs);
    setLoading(false);
    setSearched(true);
    currentPage.current = 1; // Reset the current page
  };

  useEffect(() => {
    const loadMoreBooks = async () => {
      if (loading || books.length === 0) return;
      const nextPage = currentPage.current + 1;
      const response = await fetch(`https://openlibrary.org/search.json?q=${books.query}&limit=10&page=${nextPage}`);
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, ...data.docs]);
      currentPage.current = nextPage;
    };

    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleScroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        loadMoreBooks();
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [books, loading, setBooks]);

  return (
    <div className="p-4">
      <SearchBar onSearch={searchBooks} />
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="loader"></div>
        </div>
      ) : books.length > 0 ? (
        <SearchResults books={books} addToBookshelf={addToBookshelf} />
      ) : searched ? (
        <div className="flex justify-center items-center mt-4 text-5xl">
          <p>No results found!!!</p>
        </div>
      ) : (
        <>
          <CardSlider category="Trending Books" addToBookshelf={addToBookshelf} />
          <CardSlider category="Classic Books" addToBookshelf={addToBookshelf} />
          <CardSlider category="Romance" addToBookshelf={addToBookshelf} />
          <CardSlider category="Kids" addToBookshelf={addToBookshelf} />
          <CardSlider category="Thrillers" addToBookshelf={addToBookshelf} />
        </>
      )}
    </div>
  );
};

export default BookSearchPage;
