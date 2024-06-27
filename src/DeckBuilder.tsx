import { useRef, useState } from "react";
import { ClassFrame } from "./card/ClassFrame";
import { CardFrame } from "./card/CardFrame";
import { SpellCard } from "./types";
import { useCards } from "./useCards";
import styled from "@emotion/styled";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from "html2pdf.js";
import { toDeck } from "./deck-maker/toDeck";

export const DeckBuilder = () => {
  const [deckCards, setDeckCards] = useState<SpellCard[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [sampleHand, setSampleHand] = useState<number[]>([]);

  const deckRef = useRef<HTMLDivElement>(null);
  const cards = useCards();

  return (
    <>
      <label htmlFor="deckName">deck name</label>
      <br />
      <input id="deckName" type="text" ref={nameRef} />
      <br />
      <label htmlFor="decklistArea">deck list</label>
      <br></br>
      <textarea
        ref={textAreaRef}
        onBlur={() => {
          const currentCards = textAreaRef.current?.value || "";

          const theDeck = currentCards
            .split("\n")
            .flatMap((entry) => {
              const parsed = /(\d+)? ?(.*)$/.exec(entry);
              const count = /^\d+/.exec(entry)?.[0];
              console.log(parsed);
              if (parsed) {
                const [, , cardMaybe] = parsed;

                const theCard = cards.filter(
                  (cardEtry) => cardEtry.Name === cardMaybe
                );
                if (theCard) {
                  const returnArray = new Array(parseInt(count || "1")).fill(
                    theCard
                  );
                  return returnArray;
                }
              }
              return [];
            })
            .flatMap((entry) => entry);
          setDeckCards(theDeck);
        }}
        id="decklistArea"
        placeholder={`1 Drink Deep and Descend
3 Detonate
2 Flash Freeze
...`}
      ></textarea>
      <br />

      <button
        onClick={() => {
          html2pdf(deckRef.current!, {
            filename: (nameRef.current?.value || "Wizard Joust deck") + ".pdf",
            image: { type: "jpeg", quality: 1 },

            pagebreak: { before: ".break" },
            margin: 12,
          });
        }}
      >
        download as image sheet
      </button>
      <button
        onClick={() => {
          const toDownload = toDeck(deckCards);

          const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(toDownload));
          const dlAnchorElem = document.createElement("a");
          dlAnchorElem.setAttribute("href", dataStr);
          dlAnchorElem.setAttribute(
            "download",
            (nameRef.current?.value || "Wizard Joust deck") + ".json"
          );
          dlAnchorElem.click();
        }}
      >
        export for TTS
      </button>
      {deckCards.length > 0 && (
        <div>
          <button
            onClick={() => {
              const temp = [];
              for (let i = 0; i < 5; i++) {
                temp.push(Math.floor(Math.random() * deckCards.length));
              }
              setSampleHand(temp);
            }}
          >
            draw a sample hand
          </button>
          <Hand>
            {sampleHand
              .map((e) => deckCards[e])
              .map((entry, i) => {
                return <CardFrame key={i} entry={entry} />;
              })}
          </Hand>
        </div>
      )}
      <span>cards in deck: {deckCards.length}</span>
      <DeckContainer ref={deckRef}>
        {deckCards.flatMap((entry, i) => {
          const toReturn = [];

          toReturn.push(
            entry.Subtypes === "Class" ? (
              <ClassFrame key={entry.Name + i} entry={entry}></ClassFrame>
            ) : (
              <CardFrame key={entry.Name + i} entry={entry} />
            )
          );
          console.log(i, (i + 1) % 9 == 0);
          if ((i + 1) % 9 == 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            toReturn.push(<div className="break" height="100px" />);
          }
          return toReturn;
        })}
      </DeckContainer>
    </>
  );
};

{
  /* <button
onClick={() => {
  downloadElementAsImage(frameRef.current!, card.Name);
}}
>
save as png
</button> */
}

const DeckContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  // maxWidth: (2.5 - 0.2) * 96 * 4 + "px",
});

const Hand = styled.div({ display: "flex", flexDirection: "row" });
