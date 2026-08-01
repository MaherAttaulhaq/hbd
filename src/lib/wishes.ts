export type Wish = {
  author: string;
  role?: string;
  message: string;
};

export const wishes: Wish[] = [
  {
    author: "Your Family",
    role: "With all our love",
    message:
      "Happy birthday to the heart of our family. May this year bring you the peace you give so freely, the joy you spread so easily, and every happiness your generous heart deserves.",
  },
  {
    author: "Your Patients",
    role: "With deepest gratitude",
    message:
      "To a healer who treats every person with dignity and warmth — thank you for the countless lives you have touched. Wishing you a year of good health and fulfillment.",
  },
  {
    author: "Your Friends",
    role: "With warm friendship",
    message:
      "Here's to the wisdom, laughter, and kindness you bring to every room. May your birthday be as bright and wonderful as the difference you make in the world.",
  },
];
