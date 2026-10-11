/**
 * Reading list.
 *
 * Add books here and place cover images in `public/images/books/`.
 * Do not invent titles. An empty array renders a composed empty state.
 */

export type ReadingStatus = "reading" | "finished" | "queued";

export type Book = {
  id: string;
  title: string;
  author: string;
  status?: ReadingStatus;
  note?: string;
  review?: string;
  cover: {
    src: string | null;
    alt: string;
  };
};

export const books: Book[] = [
  {
    id: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    cover: {
      src: "/images/books/a-brief-history-of-time.jpg",
      alt: "Cover of A Brief History of Time by Stephen Hawking.",
    },
  },
  {
    id: "do-hard-things",
    title: "Do Hard Things",
    author: "Steve Magness",
    cover: {
      src: "/images/books/do-hard-things.jpg",
      alt: "Cover of Do Hard Things by Steve Magness.",
    },
  },
  {
    id: "work-like-a-monk",
    title: "Work Like a Monk",
    author: "Shoukei Matsumoto",
    cover: {
      src: "/images/books/work-like-a-monk.jpg",
      alt: "Cover of Work Like a Monk by Shoukei Matsumoto.",
    },
  },
];
