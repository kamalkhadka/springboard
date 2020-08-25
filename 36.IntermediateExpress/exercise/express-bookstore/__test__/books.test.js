process.env.NODE_ENV = "test";
const request = require("supertest");
const db = require("../db");
const app = require("../app");
const { post } = require("../app");

let book;

beforeEach(async function () {
  const results = await db.query(`
    INSERT INTO books 
        (isbn, amazon_url, author, language, pages, publisher, title, year) 
    VALUES 
        ('0691161518', 
        'http://a.co/eobPtX2',
        'Matthew Lane',
        'english',
        264,
        'Princeton University Press',
        'Power-Up: Unlocking the Hidden Mathematics in Video Games',
        2017) 
    RETURNING 
        isbn, amazon_url, author, language, pages, publisher, title, year 
  `);
  book = results.rows[0];
});

describe("GET /books", () => {
  test("Get all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.books[0].isbn).toBe(book.isbn);
  });
});

describe("GET /books/:isbn", () => {
  test("Get existing book", async () => {
    const response = await request(app).get(`/books/${book.isbn}`);
    expect(response.status).toBe(200);
    expect(response.body.book.isbn).toBe(book.isbn);
  });
  test("Get not existing book", async () => {
    const response = await request(app).get(`/books/1234567890`);
    expect(response.status).toBe(404);
  });
});

describe("POST /books", () => {
  let postBook = {
    isbn: "0123456789",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2020,
  };

  test("POST valid book", async () => {
    const response = await request(app).post("/books").send(postBook);
    expect(response.status).toBe(201);
    expect(response.body.book.isbn).toBe(postBook.isbn);
  });

  test("POST book with missing info", async () => {
    delete postBook.author;
    const response = await request(app).post("/books").send(postBook);
    expect(response.status).toBe(400);
  });
});

describe("PUT /books/:isbn", () => {
  test("Update a valid book", async () => {
    book.pages = 2000;
    const response = await request(app).put(`/books/${book.isbn}`).send(book);
    expect(response.status).toBe(200);
    expect(response.body.book.pages).toBe(2000);
  });
  test("Try updating a invalid book", async () => {
    book.isbn = "1234567901";
    const response = await request(app).put(`/books/${book.isbn}`).send(book);
    expect(response.status).toBe(404);
  });
    test("Update with a missing info", async () => {
        delete book.year;
        const response = await request(app).put(`/books/${book.isbn}`).send(book);
        expect(response.status).toBe(400);
    });
});

describe("DELETE /books/:isbn", () => {
    test("Delete a valid book should return a message", async () => {
        const response = await request(app).delete(`/books/${book.isbn}`);
        expect(response.status).toBe(200);
    });

    test("Delete an invalid book should return 404", async () => {
        const response = await request(app).delete(`/books/1234567890`);
        expect(response.status).toBe(404);
    });
})

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async function () {
  db.end();
});
