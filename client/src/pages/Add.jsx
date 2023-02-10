import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialBookState = {
  title: "",
  description: "",
  price: null,
  cover: "",
};
const Add = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(initialBookState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/books", book);
      if (res.data.success) navigate("/");
      else alert("Error!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Add new book</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
          min={0}
        />
        <input
          type="text"
          placeholder="Cover"
          onChange={handleChange}
          name="cover"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Add;
