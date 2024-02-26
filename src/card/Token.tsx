import {
  Popup,
  useCloseOnEscape,
  useCloseOnOutsideClick,
  usePopupModel,
} from "@workday/canvas-kit-react/popup";
import { tokens } from "./tokens";
import { OldFrame } from "./Frame";
import styled from "@emotion/styled";
import { typeColorMappings } from "../ruleConstants";
import { textToRules } from "./textToRules";

export const Token = ({ token }: { token: string }) => {
  const model = usePopupModel();

  useCloseOnOutsideClick(model);
  useCloseOnEscape(model);
  const entry = tokens[token.replace(/ tokens?/, "")]!;
  const bgColor = typeColorMappings[entry.Types as any];

  return (
    <Popup model={model}>
      <Popup.Target as={StyledSpan}>{token}</Popup.Target>
      <Popup.Popper placement="bottom">
        <Popup.Card>
          <Popup.CloseIcon aria-label="Close" />
          <Popup.Body>
            <OldFrame bgColor={bgColor}>
              <CostBox>
                <Pitch>{entry.Pitch}</Pitch>
              </CostBox>
              <Name>{entry.Name}</Name>
              <ArtAndCost>
                <Art>
                  <img src={entry.Art} />
                </Art>
              </ArtAndCost>
              <SubType>{entry.Subtypes}</SubType>
              <Rules>{textToRules(entry.Text)}</Rules>
              <Footer>
                <Shape value={entry.Stability} />
              </Footer>
            </OldFrame>
          </Popup.Body>
        </Popup.Card>
      </Popup.Popper>
    </Popup>
  );
};

const sphersize = {
  height: "40px",
  width: "40px",
  borderRadius: "30px",
  border: "3px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const Pitch = styled.div({
  fontWeight: "bold",

  ...sphersize,
  backgroundColor: "RED",
  borderColor: "DARKRED",
});

const Footer = styled.div();

const ArtAndCost = styled.div({
  display: "flex",
  flexDirection: "row",
  position: "relative",
});
const StyledSpan = styled.span({
  fontWeight: "bold",
  textDecoration: "underline",
});
const Rules = styled.div({
  backgroundColor: "BEIGE",
  width: "100%",
  height: "35%",
});

const Shape = ({ value }: { value: number | null }) => {
  return (
    <ShapContainer>
      <StyledShape>{value}</StyledShape>
    </ShapContainer>
  );
};

const ShapContainer = styled.div({ height: "10%" });

const Art = styled.div({
  display: "flex",
  justifyContent: "center",
  height: "50%",
});
const CostBox = styled.div({
  left: "1px",
  zIndex: 5,
  height: "200px",
  flexDirection: "column",
  display: "flex",
  position: "absolute",
  justifyContent: "space-between",
});
const StyledShape = styled.div({
  borderBottom: "30px solid #BBB",
  borderLeft: "20px solid transparent",
  borderRight: "20px solid transparent",
  justifyContent: "center",
  alignItems: "baseline",
  height: "0px",
  width: "40px",
  display: "flex",
  fontSize: "30px",
});

const Name = styled.h2({
  marginBottom: "0px",
  marginTop: "0px",
  height: "46px",
  backgroundColor: "beige",
});
const SubType = styled.h4({ margin: "0px", backgroundColor: "LIGHTGREY" });
