import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-hot-toast';

const CardSlider = ({ category, addToBookshelf }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(category)}&limit=10`);
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);

  const handleAddToBookshelf = (book) => {
    addToBookshelf(book);
    toast.success(`${book.title} added to bookshelf!`);
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index} className="p-2">
            <div className="border rounded-lg p-4 bg-white flex flex-col justify-between items-center" style={{ height: '400px', width: '100%' }}>
              <div style={{ height: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="object-cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              <div style={{ height: '25%', textAlign: 'center' }}>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author_name?.join(", ") || "Unknown Author"}</p>
                <button
                  onClick={() => handleAddToBookshelf(book)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add to Bookshelf
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
