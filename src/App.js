import React, { useEffect, useState } from "react";
import Filters from "./Filters";

function App() {

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    language: "",
    pages: "",
    century: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const filterBooks = (book) => {
    const { country, language, pages, century } = filters;

    if (country && book.country !== country) return false;
    if (language && book.language !== language) return false;

    if (pages) {
      const pageNum = book.pages || 0;
      if (pages === "0-100" && pageNum > 100) return false;
      if (pages === "101-200" && (pageNum < 101 || pageNum > 200)) return false;
      if (pages === "201-300" && (pageNum < 201 || pageNum > 300)) return false;
      if (pages === "301+" && pageNum <= 300) return false;
    }

    if (century) {
      const year = book.year || 0;
      const centuryStart = (parseInt(century) - 1) * 100;
      const centuryEnd = parseInt(century) * 100;
      if (year < centuryStart || year >= centuryEnd) return false;
    }

    return true;
  };

  const filteredBooks = books
    .filter(filterBooks)
    .filter((book) =>
      `${book.title} ${book.author}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Book List</h1>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "100%",
          maxWidth: "400px",
          display: "block"
        }}
      />

      <Filters filters={filters} setFilters={setFilters} />

      <div style={{ marginBottom: "20px" }}>
        <label>
          Items per page:&nbsp;
          <select value={itemsPerPage} onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // reset to first page
          }}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
      {paginatedBooks.map((book, idx) => (

          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              background: "#f9f9f9"
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
              alt={book.title}
              style={{ width: "100%", height: "auto", borderRadius: "4px", marginBottom: "10px" }}
            />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Country:</strong> {book.country}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Year:</strong> {book.year}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={endIndex >= filteredBooks.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
