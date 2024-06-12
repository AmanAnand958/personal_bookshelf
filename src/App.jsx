import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookshelfPage from './components/BookshelfPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [bookshelf, setBookshelf] = useState(JSON.parse(localStorage.getItem('bookshelf')) || []);
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false); // Define the searched state

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const clearBooks = () => {
    setBooks([]);
    setSearched(false); // Reset the searched state
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <Router>
        <div className="p-6">
          <Toaster />
          <nav className="flex mb-4 justify-evenly">
            <Link to="/" onClick={clearBooks} className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Home</Link>
            <h1 className="text-3xl">Personal BookShelf</h1>
            <Link to="/bookshelf" className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">My Bookshelf</Link>
          </nav>
          <Routes>
            <Route path="/" element={<BookSearchPage books={books} setBooks={setBooks} setSearched={setSearched} searched={searched} addToBookshelf={addToBookshelf} />} />
            <Route path="/bookshelf" element={<BookshelfPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
