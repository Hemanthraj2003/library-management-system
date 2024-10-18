import React from "react";
interface Book {
  ID: number;
  title: string;
  author: string;
  language: string;
  stock: number;
}

interface RenderBookCardProps {
  book: Book; // Define the type of the book prop
}
const RenderBookCard: React.FC<RenderBookCardProps> = ({ book }) => {
  return (
    <div className="bg-white/10 text-white/40 hover:bg-black/20 hover:text-white/70 p-3 mx-3 mt-2 rounded-md flex flex-col">
      <div className=" text-3xl">{book.title}</div>
      <div className="flex justify-between w-5/6">
        <div>ID: {book.ID}</div>
        <div>Auhtor: {book.author}</div>
        <div>Language: {book.language},</div>
        <div>Stock: {book.stock}</div>
      </div>
    </div>
  );
};

export default RenderBookCard;
