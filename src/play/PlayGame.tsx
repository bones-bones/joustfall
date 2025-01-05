import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { fieldAtom, gameAtom, gameLog } from "./gameAtom";
import styled from "@emotion/styled";
import { useCards } from "../useCards";
import { CardFrame } from "../card/CardFrame";
import { stackAtom } from "./stackAtom";
import { SpellCard } from "../types";

export const PlayGame = () => {
  const startRef = useRef(false);
  const ee = useAtom(gameAtom);
  const field = useAtomValue(fieldAtom);
  const stack = useAtomValue(stackAtom);
  const cards = useCards();
  const log = useAtomValue(gameLog);

  useEffect(() => {
    if (!startRef.current) {
      ee[1]({ action: "startOfGame" });

      ee[1]({ action: "EndOfTurn" });
      startRef.current = true;
    }
  }, []);

  useEffect(() => {
    console.log("stack", stack);
  }, [stack.length]);

  useEffect(() => {
    console.log("field", field);
  }, [field.length]);

  const topOfStack = (stack as any)[0];
  const targets = topOfStack?.targets.map((entry: any) => entry.id) || [];

  return (
    <>
      <pre>{log.join("\n")}</pre>
      <Container>
        {field.map((entry, i) => {
          const theCard = cards.find(
            (cardEntry) => cardEntry.Name === entry.type
          );

          return (
            <GameFrame
              key={i}
              targeted={targets.includes(entry.id.toString())}
              onClick={() => {
                if (targets.includes(entry.id.toString())) {
                  console.log("selected a target", topOfStack.nextAction);

                  ee[1]({ ...topOfStack.nextAction, target: entry });
                }
              }}
            >
              {theCard ? (
                <CardFrame entry={theCard as any as SpellCard} />
              ) : (
                <DumbCardFrame>{entry.type}</DumbCardFrame>
              )}
            </GameFrame>
          );
        })}
      </Container>
    </>
  );
};

const GameFrame = styled.div(({ targeted }: { targeted: boolean }) => ({
  border: "1px solid black",
  height: "fit-content",
  ...(targeted && {
    border: "1px solid yellow",
    ":hover": {
      border: "1px solid red",
    },
  }),
}));

// Player 1 priority
// player 2 priority

const Container = styled.div({ height: "600px", display: "flex" });

const DumbCardFrame = styled.div(() => ({
  height: "300px",
  width: "200px",
  backgroundColor: "lightgray",
  border: "1px solid black",
}));
