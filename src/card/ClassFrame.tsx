import styled from "@emotion/styled";
import { Class } from "../types";
import { forwardRef } from "react";

import Primal from "./new-frames/WildFrameclass.png";

import Divine from "./new-frames/DivineFrameclass.png";
import Deep from "./new-frames/DeepFrameclass.png";
import Arcane from "./new-frames/ArcaneFrameclass.png";
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
      entry: Class;
    },
    frameRef
  ) => {
    return (
      <StyledFrame ref={frameRef as any} School={card.Class}>
        <Name>{card.Name}</Name>

        <Subtypes>{card.Types}</Subtypes>
        <Rules len={card.Text.length + (card.Text.split("\n").length - 1) * 20}>
          {textToRules(card.Text)}
        </Rules>
        <Collector>{card["Collector Info"]} Wizard Joust</Collector>
      </StyledFrame>
    );
  }
);
ClassFrame.displayName = "ClassFrame";
const FACTOR = 3;
const WIDTH = 600 / FACTOR;
const HEIGHT = 956 / FACTOR;
// 685x956

const Collector = styled.div({
  color: "white",
  top: (956 - 90) / FACTOR + 5 + "px",
  position: "absolute",
  left: 685 / 2.8 / FACTOR - 10 + "px",
  fontSize: "10px",
});

const Name = styled.div({
  fontSize: "20px",

  position: "absolute",
  height: 956 / 9 / FACTOR + "px",
  top: 35 / FACTOR + "px",
  //left: 685 / 11 / FACTOR + "px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
const Subtypes = styled.div({
  // left: 50 / FACTOR + "px",
  top: 475 / FACTOR + "px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
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
    width: WIDTH - 80 / FACTOR + "px",
    left: 85 / FACTOR + "px",
    top: 500 / FACTOR + "px",
    position: "relative",
    height: "25%",
    //@ts-expect-error
    fontSize: "16px",
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
    return { fontSize: "12px", lineHeight: "12px" }; // th edevil
  }
  return { fontSize: "10px", lineHeight: "11px" };
};
