// destructuring nested objects
const movie = {
  Title: "Amadeus",
  Year: "1984",
  Rated: {
    rating: "R",
    advisory: "Rated R for bried nudity",
  },
  Released: "19 Sep 1984",
  Runtime: "160 min",
  Genres: ["Biography", "Drama", "History", "Music"],
  Director: "Milos Forman",
  Writer:
    "Peter Shaffer (original stage play), Peter Shaffer (original screenplay)",
  Actors: "F. Murray Abraham, Tom Hulce, Elizabeth Berridge, Roy Dotrice",
};



const { Rated: { rating, advisory: note} } = movie;

// destructuring swap
let delicious = 'Mayonnaise';
let disgusting = 'Whipped Cream';

[disgusting, delicious] = [delicious, disgusting];