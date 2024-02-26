import styled from "@emotion/styled";
import { SpellCard } from "../types";
import { forwardRef } from "react";

import Primal from "./png/Primal_Frame.png";

import Divine from "./png/Divine_Frame.png";
import Deep from "./png/Deep_Frame.png";
import Arcane from "./png/Arcane_Frame.png";
import { textToRules } from "./textToRules";

const getBackground = (school: string) => {
  if (school.includes("Deep")) {
    return Deep;
  }

  if (school.includes("Divine")) {
    return Divine;
  }
  if (school.includes("Arcane")) {
    return Arcane;
  }

  return Primal;
};

export const ClassFrame = forwardRef(
  (
    {
      entry: card,
    }: {
      entry: SpellCard;
    },
    frameRef
  ) => {
    return (
      <StyledFrame ref={frameRef as any} School={card.School}>
        <Name>{card.Name}</Name>

        <Subtypes>{card.Subtypes}</Subtypes>
        <Rules
          len={card.Text.length + (card.Text.split("<br>").length - 1) * 20}
        >
          {textToRules(card.Text)}
        </Rules>
        <Collector>{card["Collector Info"]} Wizard Joust</Collector>
        <Rarity>{card.Rarity}</Rarity>
      </StyledFrame>
    );
  }
);
ClassFrame.displayName = "ClassFrame";
const FACTOR = 3;
const WIDTH = 685 / FACTOR;
const HEIGHT = 956 / FACTOR;
// 685x956

const Collector = styled.div({
  top: (956 - 90) / FACTOR + 5 + "px",
  position: "absolute",
  left: 685 / 2.8 / FACTOR - 10 + "px",
  fontSize: "10px",
});

const Name = styled.div({
  fontSize: "25px",
  width: 685 / FACTOR / 2.1 + "px",
  position: "absolute",
  height: 956 / 9 / FACTOR + "px",
  top: 956 / 14 / FACTOR + "px",
  left: 685 / 11 / FACTOR + "px",
  display: "flex",
  alignItems: "center",
});
const Subtypes = styled.div({
  left: 50 / FACTOR + "px",
  top: 580 / FACTOR + "px",
  position: "relative",
});
const Rarity = styled.div({
  top: (956 - 90) / FACTOR + "px",
  position: "absolute",
  right: 685 / 13 / FACTOR + 5 + "px",
});

const StyledFrame = styled.div(({ School }: { School: string }) => ({
  backgroundImage: `url(${getBackground(School)})`,
  position: "relative",
  backgroundSize: `${685 / FACTOR}px ${956 / FACTOR}px`,
  width: 685 / FACTOR,
  height: 956 / FACTOR,
}));

//https://game-icons.net/

const Rules = styled.div(({ len }: { len: number }) => {
  return {
    width: WIDTH - (50 * 2) / FACTOR + "px",
    left: 50 / FACTOR + "px",
    top: 590 / FACTOR + "px",
    position: "relative",
    height: "25%",
    fontSize: "16px",
    ...(len >= 70 && len < 124 && { fontSize: "14px", lineHeight: "14px" }),
    ...(len >= 124 && len < 182 && { fontSize: "12px", lineHeight: "13px" }),
    ...(len >= 182 && len < 290 && { fontSize: "10px", lineHeight: "11px" }), // the devil
    ...(len >= 290 && { fontSize: "10px", lineHeight: "11px" }), // Greatmoth
  };
});
