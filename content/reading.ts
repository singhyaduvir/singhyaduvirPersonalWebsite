/**
 * Reading list.
 *
 * Add books here and place cover images in `public/images/books/`.
 * An empty array renders a composed empty state.
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
    status: "reading",
    review: "A preliminary read for those interested in the intersection of physics and cosmology. The intent of his first work was to make the subjects of space, time, and quantum mechanics accessible to the general public. Hawking does this quite skillfully making some chapters open to interpretation and others more technical.",
    cover: {
      src: "/images/books/a-brief-history-of-time.jpg",
      alt: "Cover of A Brief History of Time by Stephen Hawking.",
    },
  },
  {
    id: "do-hard-things",
    title: "Do Hard Things",
    author: "Steve Magness",
    status: "finished",
    review: "A refutation against the traditional notions of perseverence and grit. Magness uses his experiences as a coach, athlete, and other examples in the sports industry to develop mental models for how to approach challenges and times of performance. Although more of an elementary read, it was interesting to explore how sports psychology can be applied to mental dexterity in academic or professional settings.",
    cover: {
      src: "/images/books/do-hard-things.jpg",
      alt: "Cover of Do Hard Things by Steve Magness.",
    },
  },
  {
    id: "work-like-a-monk",
    title: "Work Like a Monk",
    author: "Shoukei Matsumoto",
    status: "finished",
    review: "One of my favorite reads of the year. Matsumoto reflects on his time in the corporate world where he stumbles upon a monastary during a corporate excursion. Connecting spiritually with one of the monks at the temple, the monk initially helps Matsumoto acquire purpose, mindfulness, and clarity in the noise of corporate life and later through his cancer diagnosis and recovery. The conversational nature of the book makes this a great read from other self-help books.",
    cover: {
      src: "/images/books/work-like-a-monk.jpg",
      alt: "Cover of Work Like a Monk by Shoukei Matsumoto.",
    },
  },
];
