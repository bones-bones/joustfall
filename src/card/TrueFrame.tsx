import styled from "@emotion/styled";

import { SpellCard } from "../types";
import { useRef } from "react";
import { getBackground } from "../getBackground";
import { downloadElementAsImage } from "../download-image";
import { ClassFrame } from "./ClassFrame";
import { CardFrame } from "./CardFrame";

export const TrueFrame = ({
  entry: card,
  allowDownload,
}: {
  entry: SpellCard;
  allowDownload?: boolean;
}) => {
  const frameRef = useRef(null);
  return (
    <CardWithButton>
      <Container>
        {card.Subtypes === "Class" ? (
          <ClassFrame entry={card} ref={frameRef}></ClassFrame>
        ) : (
          <CardFrame entry={card} ref={frameRef}></CardFrame>
        )}
      </Container>
      {allowDownload && (
        <button
          style={{ fontFamily: "crimsonNormal", width: "50%" }}
          onClick={() => {
            downloadElementAsImage(frameRef.current!, card.Name);
          }}
        >
          save{" "}
        </button>
      )}
    </CardWithButton>
  );
};

const CardWithButton = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});
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
  top: (956 - 90) / FACTOR + "px",
  position: "absolute",
  left: 685 / 2.8 / FACTOR + "px",
  fontSize: "14px",
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

const Container = styled.div({
  flexDirection: "column",
  display: "flex",
  justifyContent: "center",
  fontFamily: "crimsonNormal",
  width: 685 / FACTOR,
  height: 956 / FACTOR,
});

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
