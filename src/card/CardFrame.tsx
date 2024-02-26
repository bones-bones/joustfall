import styled from "@emotion/styled";

import { SpellCard } from "../types";
import { forwardRef } from "react";
import { getBackground } from "../getBackground";
import { textToRules } from "./textToRules";

export const CardFrame = forwardRef(
  (
    {
      entry: card,
    }: {
      entry: SpellCard;
    },
    frameRef
  ) => {
    console.log(card.Image);
    return (
      <StyledFrame ref={frameRef as any} School={card.School}>
        <Name>{card.Name}</Name>
        <Pitch>{card.Pitch}</Pitch>
        <Cost>{card.Cost}</Cost>
        <Subtypes>{card.Subtypes}</Subtypes>
        <Rules
          len={card.Text.length + (card.Text.split("<br>").length - 1) * 20}
        >
          {textToRules(card.Text)}
        </Rules>
        <Stability>{card.Stability}</Stability>
        <Collector>{card["Collector Info"]} Wizard Joust</Collector>
        <Rarity>{card.Rarity}</Rarity>
      </StyledFrame>
    );
  }
);
CardFrame.displayName = "CardFrame";
const FACTOR = 3;
const WIDTH = 685 / FACTOR;
const HEIGHT = 956 / FACTOR;
// 685x956
const Cost = styled.div({
  top: 956 / 4.2 / FACTOR + "px",
  position: "absolute",
  left: 685 / 7 / FACTOR + "px",
  fontSize: "18px",
  fontWeight: "bold",
});

const Pitch = styled.div({
  top: 956 / 12 / FACTOR + "px",
  position: "absolute",
  left: 685 / 7 / FACTOR + "px",
  fontSize: "18px",
  fontWeight: "bold",
});
const Name = styled.div({
  width: 685 / FACTOR / 2.1 + "px",
  position: "absolute",
  height: 956 / 9 / FACTOR + "px",
  top: 956 / 14 / FACTOR + "px",
  left: 685 / 4 / FACTOR + 3 + "px",
  display: "flex",
  alignItems: "center",
});
const Subtypes = styled.div({
  left: 50 / FACTOR + "px",
  top: 520 / FACTOR + "px",
  position: "relative",
});

const Stability = styled.div({
  top: (956 - 90) / FACTOR + "px",
  position: "absolute",
  left: 685 / 10 / FACTOR + 5 + "px",
  fontSize: "18px",
  fontWeight: "bold",
});

const Collector = styled.div({
  top: (956 - 90) / FACTOR + 5 + "px",
  position: "absolute",
  left: 685 / 2.8 / FACTOR - 10 + "px",
  fontSize: "10px",
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
    top: 550 / FACTOR + "px",
    position: "relative",
    height: "25%",
    fontSize: "16px",
    ...(len >= 70 && len < 124 && { fontSize: "14px", lineHeight: "14px" }),
    ...(len >= 124 && len < 182 && { fontSize: "11px", lineHeight: "11px" }),
    ...(len >= 182 && len < 290 && { fontSize: "11px", lineHeight: "12px" }), // The Ravenous Pact case
    ...(len >= 290 && { fontSize: "10px", lineHeight: "11px" }), // Greatmoth
  };
});
