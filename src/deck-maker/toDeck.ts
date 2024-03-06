import { SpellCard } from "../types";
import { getBaseObject } from "./getBase";
import { getCard } from "./getCard";

export const toDeck = (cards: SpellCard[]) => {
  const baseDeck = getBaseObject();

  const deckCards = cards.map((entry, i) => {
    (baseDeck.ObjectStates[0].DeckIDs as number[]).push((i + 1) * 100);

    const thing = {
      FaceURL: entry.Image,
      BackURL:
        "https://ist7-1.filesor.com/pimpandhost.com/2/6/5/8/265896/f/x/K/D/fxKDU/Custom-Back_l.jpg",
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
      description: `Cost: ${entry.Cost}\nPitch: ${entry.Pitch}\n${entry.Text}`,
    });

    return mainCard;
  });
  (baseDeck.ObjectStates[0].ContainedObjects as any) = deckCards;
  return baseDeck;
};
