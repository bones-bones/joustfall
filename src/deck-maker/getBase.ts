export const getBaseObject = () => ({
  SaveName: "",
  GameMode: "",
  Date: "",
  Gravity: 0.5,
  PlayArea: 0.5,
  GameType: "",
  GameComplexity: "",
  Tags: [],
  Table: "",
  Sky: "",
  Note: "",
  Rules: "",
  LuaScript: null,
  LuaScriptState: null,
  XmlUI: null,
  TabStates: {},
  VersionNumber: "",
  ObjectStates: [
    {
      Name: "Deck",
      Transform: {
        posX: 0,
        posY: 0,
        posZ: 0,
        rotX: 0,
        rotY: 180,
        rotZ: 180,
        scaleX: 1.1339285714285714,
        scaleY: 1,
        scaleZ: 1.11125,
      },
      Nickname: "",
      Description: "",
      GMNotes: "",
      ColorDiffuse: {
        r: 0.713235259,
        g: 0.713235259,
        b: 0.713235259,
      },
      Locked: false,
      Grid: true,
      Snap: true,
      IgnoreFoW: false,
      DeckIDs: [], //Fill this
      CustomDeck: {}, // and this
      ContainedObjects: [], // aaand this
      MeasureMovement: false,
      DragSelectable: true,
      Autoraise: true,
      Sticky: true,
      Tooltip: true,
      GridProjection: false,
      HideWhenFaceDown: true,
      Hands: false,
      SidewaysCard: false,
      XmlUI: "",
      LuaScript: "",
      LuaScriptState: "",
      GUID: "",
    },
  ],
});
