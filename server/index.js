import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "book_shop",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ success: true, data: "Hello this is Backend!" });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json({ success: false, data: err });
    else return res.json({ success: true, data: data });
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json({ success: false, data: err });
    else return res.json({ success: true, data: "Book created successfully" });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json({ success: false, data: err });
    else return res.json({ success: true, data: "Book deleted successfully" });
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    parseInt(req.body.price),
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json({ success: false, data: err });
    else return res.json({ success: true, data: "Book updated successfully" });
  });
});

app.listen(port, () => console.log(`Server running at PORT: ${port}`));
