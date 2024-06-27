import Primal from "./card/new-frames/WildFrame.png";

import Divine from "./card/new-frames/DivineFrame.png";
import Deep from "./card/new-frames/DeepFrame.png";
import Arcane from "./card/new-frames/ArcaneFrame.png";
import Schooless from "./card/new-frames/GenericFrame.png";

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
