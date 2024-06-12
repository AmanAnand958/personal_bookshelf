import React from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';

export function BookCard({ book, addToBookshelf }) {
  const coverUrl = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : 'https://via.placeholder.com/150'; // Placeholder image if no cover is available

  const handleAddToBookshelf = () => {
    addToBookshelf(book);
    toast.success(`${book.title} added to bookshelf!`);
  };

  return (
    <div >
      <Card
        shadow={false}
        className="relative w-full max-w-[28rem] h-full items-end justify-center overflow-hidden text-center transition duration-300 transform hover:scale-105"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverUrl})`
          }}
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-medium leading-[1.5]"
          >
            {book.title}
          </Typography>
          <Typography variant="h5" className="mb-4 text-gray-400">
            {book.author_name?.join(', ') || 'Unknown Author'}
          </Typography>
          <Avatar
            size="xl"
            variant="circular"
            alt={book.author_name?.join(', ') || 'Unknown Author'}
            className="border-2 border-white"
            src={coverUrl}
          />
         <button
            onClick={handleAddToBookshelf}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add to Bookshelf
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

export default BookCard;
