/**
 * Beyond work.
 *
 * Add hobbies here and place photos in `public/images/hobbies/`.
 * An empty array renders a composed empty state. Do not treat placeholder
 * frames as biographical facts.
 */

export type Interest = {
  id: string;
  title: string;
  description: string;
  image: {
    src: string | null;
    alt: string;
  };
  video?: {
    src: string;
    type: string;
  };
};

export const interests: Interest[] = [
  {
    id: "dancing",
    title: "Dancing",
    description: "As the Vice President of Dance All Out (DAO) Purdue, I am able to lead this amazing team of dancers in creating a vibrant and inclusive dance community at Purdue University.",
    image: {
      src: "/images/hobbies/dancing.jpg",
      alt: "A large group of people gathered together at a party.",
    },
  },
  {
    id: "guitar",
    title: "Guitar",
    description: "The first instrument I ever picked up and never put down. I love to destress and make my own musical scores and pieces.",
    image: {
      src: null,
      alt: "Guitar",
    },
    video: {
      src: "/videos/hobbies/guitar-clip.mp4",
      type: "video/mp4",
    },
  },
  {
    id: "cooking",
    title: "Cooking",
    description: "As a passionate consumer of food, I love exploring new recipes and making delicious meals.",
    image: {
      src: "/images/hobbies/cooking.jpg",
      alt: "Plates of pasta with chicken and herbs.",
    },
  },
];
