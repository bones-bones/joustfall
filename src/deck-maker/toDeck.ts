import { Base2 } from "../types";
import { getBaseObject } from "./getBase";
import { getCard } from "./getCard";

export const toDeck = (cards: Base2[]) => {
  const baseDeck = getBaseObject();

  const deckCards = cards.map((entry, i) => {
    (baseDeck.ObjectStates[0].DeckIDs as number[]).push((i + 1) * 100);

    const thing = {
      FaceURL: entry.Image,
      BackURL:
        "https://lh3.googleusercontent.com/d/17lh_9VtwOQpB7DDuGRURqvZwA9oKX2vP",
      NumWidth: 1,
      NumHeight: 1,
      BackIsHidden: true,
      UniqueBack: false,
      Type: 1,
    };

    (baseDeck.ObjectStates[0].CustomDeck as any)[i + 1 + ""] = thing;

    const mainCard = getCard({
      thing: { [i + 1 + ""]: thing },
      name: entry.Name,
      id: (i + 1) * 100,
      //@ts-ignore
      description: `Cost: ${entry.Cost}\nPitch: ${entry.Pitch}\n${entry.Text}`,
    });

    return mainCard;
  });
  (baseDeck.ObjectStates[0].ContainedObjects as any) = deckCards;
  return baseDeck;
};
