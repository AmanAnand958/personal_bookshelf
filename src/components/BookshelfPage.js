import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBooks);
  }, []);

  const removeFromBookshelf = (bookKey) => {
    toast.error("Book Removed form List");
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">My Bookshelf</h2>
      <div className="flex flex-col">
        {bookshelf.map((book) => {
          const coverUrl = book.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
            : 'https://via.placeholder.com/150'; // Placeholder image if no cover is available

          return (
            <div key={book.key} className="p-4 border border-gray-300 rounded-md mb-4 flex justify-between items-center">
              <div className="flex">
                <img src={coverUrl} alt={book.title} className="w-24 h-36 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-600">{book.author_name?.join(', ') || 'Unknown Author'}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromBookshelf(book.key)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookshelfPage;
