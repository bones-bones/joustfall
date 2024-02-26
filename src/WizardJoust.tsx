import styled from "@emotion/styled";

import { useCards } from "./useCards";

import { useState } from "react";
import { Global } from "@emotion/react";
// @ts-ignore
import crimsonNormal from "./fonts/CrimsonText-Regular.ttf";

import { DeckBuilder } from "./DeckBuilder";
import { TrueFrame } from "./card/TrueFrame";
// import { PlayGame } from "./PlayGame";

export const WizardJoust = () => {
  const cards = useCards();
  const [activeFilter, setActiveFilter] = useState<
    "Arcane" | "Deep" | "Divine" | "Primal" | undefined
  >();

  const [deckBuilding, setdeckBuilding] = useState(false);

  const filteredCards = cards.filter(
    (entry) =>
      activeFilter === undefined ||
      entry.School.includes(activeFilter) ||
      entry.School.includes("Schooless")
  );

  return (
    <>
      <Global
        styles={[
          {
            "@font-face": {
              fontFamily: "crimsonNormal",
              fontStyle: "normal",
              src: `url(${crimsonNormal})`,
            },
          },
        ]}
      />

      <h2>Welcome to Joustfall</h2>
      <h2>
        <a href="https://discord.gg/GCgVaPq3">{`It's Wizard Jousting!`}</a>
      </h2>

      {/* <PlayGame /> */}
      {deckBuilding ? (
        <DeckBuilder></DeckBuilder>
      ) : (
        <button
          onClick={() => {
            setdeckBuilding(true);
          }}
        >
          Want to build a deck? click here
        </button>
      )}
      <h3>
        Filter by school:
        <ClassButton
          color="red"
          lighterColor="pink"
          active={activeFilter === "Arcane"}
          onClick={() => {
            if (activeFilter !== "Arcane") {
              setActiveFilter("Arcane");
            } else {
              setActiveFilter(undefined);
            }
          }}
        >
          Arcane
        </ClassButton>
        <ClassButton
          color="blue"
          active={activeFilter === "Deep"}
          onClick={() => {
            if (activeFilter !== "Deep") {
              setActiveFilter("Deep");
            } else {
              setActiveFilter(undefined);
            }
          }}
        >
          Deep
        </ClassButton>
        <ClassButton
          color="goldenrod"
          lighterColor="gold"
          active={activeFilter === "Divine"}
          onClick={() => {
            if (activeFilter !== "Divine") {
              setActiveFilter("Divine");
            } else {
              setActiveFilter(undefined);
            }
          }}
        >
          Divine
        </ClassButton>
        <ClassButton
          color="green"
          active={activeFilter === "Primal"}
          onClick={() => {
            if (activeFilter !== "Primal") {
              setActiveFilter("Primal");
            } else {
              setActiveFilter(undefined);
            }
          }}
        >
          Primal
        </ClassButton>
      </h3>
      <CardContainer>
        {filteredCards.map((entry) => {
          return (
            <TrueFrame key={entry.Name} entry={entry} allowDownload></TrueFrame>
          );
        })}
      </CardContainer>
    </>
  );
};

const ClassButton = styled.button(
  ({
    color,
    lighterColor,
    active,
  }: {
    color: string;
    lighterColor?: string;
    active: boolean;
  }) => ({
    border: "none",
    textDecoration: "underline",
    background: "none",
    backgroundColor: active ? lighterColor || "light" + color : "none",
    fontWeight: "bold",
    color,
    boxSizing: "content-box",
    ":hover": { backgroundColor: lighterColor || "light" + color },
    fontSize: "20px",
  })
);

const CardContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
});
