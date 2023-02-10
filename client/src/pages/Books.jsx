import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/books");
      setBooks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/books/" + id);
      if (res.data.success) {
        fetchData();
      } else alert("Error!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book, index) => (
          <div className="book" key={index}>
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>

      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
