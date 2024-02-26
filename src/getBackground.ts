import Primal from "./jpg/Primal.jpg";

import Divine from "./jpg/Divine.jpg";
import Deep from "./jpg/Deep.jpg";
import Arcane from "./jpg/Arcane.jpeg";
import Schooless from "./jpg/Schooless.jpg";

export const getBackground = (school: string) => {
  if (school.includes("Deep")) {
    return Deep;
  }

  if (school.includes("Divine")) {
    return Divine;
  }
  if (school.includes("Arcane")) {
    return Arcane;
  }

  if (school.includes("Primal")) {
    return Primal;
  }

  return Schooless;
};
