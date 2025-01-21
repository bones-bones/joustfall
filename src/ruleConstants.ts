export const keywords: Record<string, string> = {
  Toll: "A toll is a cost that must be paid in order to resolve a spell’s cast effects. If you don't pay the toll, the spell's cast effects instead do nothing.",
  Collapsing:
    "If a collapsing spell would take damage exceeding its current stability, the excess damage is re-assigned to you.",
  Swift: "A swift spell can be cast at any time, not just during your turn.",
  Search:
    "To search a zone, look through it for the designated card or cards, then reveal it. When you finish searching, turn all face up cards in that zone face down, then shuffle.",
  Ritual:
    "To perform a ritual, set the indicated number of cards in play aside into a ritual. This can be reused for other rituals of the same number, but not rituals of different numbers. If any spell in a ritual is broken, the ritual also breaks.",
  Instill:
    "Forces the opponent to create a token. They are considered the caster of this token spell, and can activate its abilities and even use it to pitch for costs, assuming it doesn’t have immutable.",
  Void: "Voiding a card is an action where you move a card from its current zone to Memory. Cards in memory are placed under their owner’s class.",
  Immutable:
    "If a card is Immutable, you can’t use it to pay for pitch costs. Immutable applies in every zone. It can still be discarded for other effects and broken as normal.",
  Howl: "When a card instructs you to howl, effects that trigger “On Howl,” trigger.",
  Aegis:
    "If damage would be dealt to you, you may instead deal that damage to a spell with aegis. If you control multiple spells with aegis, choose one of them for an instance of damage to be dealt to. Damage can only be redirected this way if the spell has greater than 0 stability.",
  Amalgam:
    "Spells with Amalgam can be played from your hand face down face down by pitching 2. As long as a spell with amalgam is in play face down, you can cast it by discarding spells in play with the listed qualities.",
  Subsume:
    "Spells with Subsume can only be played covering spells that fit the listed qualities. For example, a card with Subsume Place could only be played covering a Place.",
  Archive: "To Archive a card, put it face up in memory, under your class.",
  "Trap!":
    "Spells with Trap! can be played from your hand face down during your turn by pitching 2. As long as they’re in play face down, you may cast them later when the trap triggering condition is met, as though they had swift.",
  Unveil:
    "Unveil abilities are abilities that can be activated when a card is revealed.",
  Demanding:
    "Spells that are Demanding can only be included in a deck or reserve if the full list meets its demands. For example, Larvae from Beyond the Fold cannot be included in your deck or moved there between games, as this would violate its demands.",
  Swap: "Swapping cards is an action where you exchange two card’s positions and states. Each card exchanges damage, attachments, zones, and facing. If an effect targeted one of the cards before swapping, it now targets the card that replaced it.",
};

export const typeColorMappings: Record<string, string> = {
  "-": "GREY",
  Arcane: "PURPLE",
  Deep: "BLUE",
  "Deep ": "BLUE",
  Divine: "GOLD",
  Primal: "GREEN",
};
