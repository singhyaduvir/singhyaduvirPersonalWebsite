export type Interest = {
  id: string;
  title: string;
  description: string;
  image?: {
    src: string;
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
    video: {
      src: "/videos/hobbies/guitar-clip.mp4",
      type: "video/mp4",
    },
  },
];
