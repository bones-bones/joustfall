import styled from "@emotion/styled";

import { useCards } from "./useCards";

import { useState } from "react";
import { Global } from "@emotion/react";
// @ts-ignore
import crimsonNormal from "./fonts/CrimsonText-Regular.ttf";

import { DeckBuilder } from "./DeckBuilder";
import { TrueFrame } from "./card/TrueFrame";
import CardBack from "./card/new-frames/CardBackwhite.png";
import { SpellCard } from "./types";

// import { PlayGame } from "./PlayGame";

const H1 = styled.h1({
  marginTop: "0px",
  fontFamily: "crimsonNormal",
});

export const WizardJoust = () => {
  const cards = useCards();
  const [activeFilter, setActiveFilter] = useState<
    "Arcane" | "Deep" | "Divine" | "Primal" | "Generic" | undefined
  >();
  const [sortOrder, setSortOrder] = useState<
    "Alpha" | "Pitch" | "Cost" | "Stability" | "Default"
  >("Default");

  const [deckBuilding, setdeckBuilding] = useState(false);

  const filteredCards = cards.filter(
    (entry) =>
      activeFilter === undefined ||
      entry.Class.includes(activeFilter) ||
      entry.Class.includes("Generic")
  );

  const sortedCards = filteredCards.sort((a, b) => {
    switch (sortOrder) {
      case "Alpha": {
        return a.Name > b.Name ? 1 : -1;
      }
      case "Cost": {
        //@ts-ignore
        const costA = isNaN((a as SpellCard).Cost)
          ? -10
          : (a as SpellCard).Cost!;

        //@ts-ignore
        const costB = isNaN((b as SpellCard).Cost)
          ? -10
          : (b as SpellCard).Cost!;
        if (costA > costB) {
          return 1;
        } else if (costA < costB) {
          return -1;
        } else {
          return a.Name > b.Name ? 1 : -1;
        }
      }
      case "Pitch": {
        //@ts-ignore
        const costA = isNaN((a as SpellCard).Pitch)
          ? -10
          : (a as SpellCard).Pitch!;

        //@ts-ignore
        const costB = isNaN((b as SpellCard).Pitch)
          ? -10
          : (b as SpellCard).Pitch!;

        if (costA > costB) {
          return 1;
        } else if (costA < costB) {
          return -1;
        } else {
          return a.Name > b.Name ? 1 : -1;
        }
      }
      case "Stability": {
        //@ts-ignore
        const costA = isNaN((a as SpellCard).Stability)
          ? -10
          : (a as SpellCard).Stability!;

        //@ts-ignore
        const costB = isNaN((b as SpellCard).Stability)
          ? -10
          : (b as SpellCard).Stability!;
        if (costA > costB) {
          return 1;
        } else if (costA < costB) {
          return -1;
        } else {
          return a.Name > b.Name ? 1 : -1;
        }
      }
      case "Default": {
        return 0;
      }
      default: {
        return 1;
      }
    }
  });

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
      <Background>
        <Banner>
          <H1>Welcome to Joustfall</H1>
          <h2>
            <a href="https://discord.gg/KwYzUQ9u7D">{`It's Wizard Jousting!`}</a>
          </h2>

          {/* <PlayGame /> */}
          {deckBuilding ? (
            <DeckBuilder></DeckBuilder>
          ) : (
            <button
              style={{ fontFamily: "crimsonNormal" }}
              onClick={() => {
                setdeckBuilding(true);
              }}
            >
              Want to build a deck? click here
            </button>
          )}
        </Banner>
        <Filter>
          Filter by Class:
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
          <ClassButton
            color="grey"
            active={activeFilter === "Generic"}
            onClick={() => {
              if (activeFilter !== "Generic") {
                setActiveFilter("Generic");
              } else {
                setActiveFilter(undefined);
              }
            }}
          >
            Generic
          </ClassButton>
        </Filter>
        <div>
          <label htmlFor="sortSelector">Sort</label>
          <select
            id="sortSelector"
            defaultValue={sortOrder}
            onChange={(e) => {
              // @ts-expect-error
              setSortOrder(e.target.value);
            }}
          >
            <option>Default</option>
            <option>Alpha</option>
            <option>Cost</option>
            <option>Pitch</option>
            <option>Stability</option>
          </select>
        </div>
        <CardContainer>
          {sortedCards.map((entry) => {
            return (
              <TrueFrame
                key={entry.Name}
                entry={entry as SpellCard}
                allowDownload
              ></TrueFrame>
            );
          })}
        </CardContainer>
      </Background>
    </>
  );
};

const Filter = styled.h3({
  marginTop: "0px",
  fontFamily: "crimsonNormal",
  backgroundColor: "beige",
  padding: "20px",
});

const Background = styled.div({
  backgroundImage: "url(" + CardBack + ")",
  fontFamily: "crimsonNormal",
});

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
    fontFamily: "crimsonNormal",
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

const Banner = styled.div({ backgroundColor: "wheat" });
