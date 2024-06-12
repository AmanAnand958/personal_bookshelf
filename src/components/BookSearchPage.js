import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CardSlider from './CardSlider';
import './loader.css'

const BookSearchPage = ({ books, setBooks, searched, setSearched, addToBookshelf }) => {
  const [loading, setLoading] = useState(false);

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
    setSearched(true); // Set searched to true after search
  };

  useEffect(() => {
    const loadMoreBooks = async () => {
      if (loading || books.length === 0) return;
      const currentPage = Math.floor(books.length / 10) + 1;
      const response = await fetch(`https://openlibrary.org/search.json?q=${books.query}&limit=10&page=${currentPage + 1}`);
      const data = await response.json();
      setBooks([...books, ...data.docs]);
    };

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        loadMoreBooks();
      }
    };

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
