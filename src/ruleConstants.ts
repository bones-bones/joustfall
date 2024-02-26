export const keywords: Record<string, string> = {
  Toll: "A toll is an ability that must be activated before you play a spell. It’s activated from your hand, and can only be activated once.",
  Feedback:
    "If an unstable spell would take damage exceeding its current Stability, it deals that excess to you.",
  Swift: "A swift spell can be cast at any time, not just during your turn.",
  Search:
    "To search a zone, look through it for the designated card or cards, then reveal it. When you finish searching, shuffle.",
  Ritual:
    "To perform a ritual, set the indicated number of cards in play aside into a ritual. This can be reused for other rituals of the same number, but not rituals of different numbers. If any spell in a ritual is broken, the ritual also breaks.",
  Instill:
    "Forces the opponent to create a token. They are considered the caster of this token spell, and can activate its abilities and even use it to pitch for costs, assuming it doesn’t have immutable.",
  Immutable: "You can't use this to pay for pitch costs",
  Howl: "When a card instructs you to howl, effects that trigger “On Howl,” trigger.",
  Aegis:
    "If damage would be dealt to you, instead deal that damage to the spell.",
  Amalgam:
    "Spells with Amalgam can be played from your hand face down face down by pitching 2. As long as a spell with amalgam is in play face down, you can cast it by discarding spells in play with the listed qualities.",
  Subsume:
    "Spells with Subsume can only be played covering spells that fit the listed qualities. For example, a card with Subsume Place could only be played covering a Place.",
  "Trap!":
    "Spells with Trap! can be played from your hand face down during your turn by pitching 2. As long as they’re in play face down, you may cast them later when the trap triggering condition is met, as though they had swift.",
  Unveil:
    "Unveil abilities are abilities that can be activated when a card is revealed.",
};

export const typeColorMappings: Record<string, string> = {
  "-": "GREY",
  Arcane: "PURPLE",
  Deep: "BLUE",
  "Deep ": "BLUE",
  Divine: "GOLD",
  Primal: "GREEN",
};
