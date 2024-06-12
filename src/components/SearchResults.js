import React from 'react';
import BookCard from './BookCard';

const SearchResults = ({ books, addToBookshelf }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10">
      {books.map((book) => (
        <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
      ))}
    </div>
  );
};

export default SearchResults;
