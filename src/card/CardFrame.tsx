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
    return (
      <StyledFrame ref={frameRef as any} School={card.Class}>
        <Name len={card.Name.length}>{card.Name}</Name>
        <Pitch>
          {
            //@ts-ignore
            !isNaN(card.Pitch) ? card.Pitch : "-"
          }
        </Pitch>
        <Cost>{card.Cost}</Cost>
        <Subtypes>{card.Types}</Subtypes>
        <Rules len={card.Text.length + (card.Text.split("\n").length - 1) * 35}>
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
// 685x956
const Cost = styled.div({
  top: 200 / FACTOR + "px",
  position: "absolute",
  left: 40 / FACTOR + "px",
  fontSize: "33px",
  width: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Pitch = styled.div({
  top: 30 / FACTOR + "px",
  position: "absolute",
  left: 35 / FACTOR + "px",
  fontSize: "30px",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Name = styled.div(({ len }: { len: number }) => ({
  position: "absolute",
  height: "25px",
  top: 40 / FACTOR + "px",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  ...getNameSize(len),
  alignItems: "center",
}));

const getNameSize = (len: number) => {
  if (len < 19) {
    return { fontSize: "15px" };
  }
  if (len < 21) {
    return { fontSize: "14px" };
  }
  if (len < 30) {
    return { fontSize: "12px" };
  }
  return { fontSize: "18px" };
};

const Subtypes = styled.div({
  // left: 50 / FACTOR + "px",
  top: 470 / FACTOR + "px",
  position: "relative",
  display: "flex",
  width: "100%",
  justifyContent: "center",
});

const Stability = styled.div({
  top: 825 / FACTOR + "px",
  position: "absolute",
  left: 55 / FACTOR + 5 + "px",
  fontSize: "25px",
});

const Collector = styled.div({
  color: "white",
  top: 875 / FACTOR + 5 + "px",
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
    width: WIDTH - 110 / FACTOR + "px",
    left: 60 / FACTOR + "px",
    top: 510 / FACTOR + "px",
    position: "relative",
    height: "25%",
    ...getCssFromLength(len),
  };
});

const getCssFromLength = (length: number) => {
  if (length < 70) {
    return { fontSize: "16px" };
  }
  if (length < 124) {
    return { fontSize: "14px", lineHeight: "14px" };
  }
  if (length < 182) {
    return { fontSize: "13px", lineHeight: "13px" };
  }
  if (length < 290) {
    return { fontSize: "12px", lineHeight: "12px" }; // The Ravenous Pact case
  }
  if (length < 300) {
    return { fontSize: "11px", lineHeight: "11px" }; // The Ravenous Pact case
  }

  return { fontSize: "10px", lineHeight: "10px" }; //// Greatmoth
};
