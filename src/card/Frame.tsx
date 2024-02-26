import styled from "@emotion/styled";

export const OldFrame = styled.div(
  ({ bgColor, longName }: { bgColor: string; longName?: boolean }) => ({
    width: 63.5 * 4 + "px",
    overflow: "hidden",
    padding: "2px",
    height: 88.9 * 4 + "px", //63.5×88.9mm
    border: "10px solid",
    borderColor: "BLACK",
    backgroundColor: "black", // bgColor, //"rgb(240,242,245)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  })
);

//24
