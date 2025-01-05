import {
  Popup,
  useCloseOnEscape,
  useCloseOnOutsideClick,
  usePopupModel,
} from "@workday/canvas-kit-react/popup";

import styled from "@emotion/styled";

import { useAtomValue } from "jotai";
import { tokenAtom } from "../useCards";
import { TrueFrame } from "./TrueFrame";

export const Token = ({ token }: { token: string }) => {
  const model = usePopupModel();
  const tokens = useAtomValue(tokenAtom);

  useCloseOnOutsideClick(model);
  useCloseOnEscape(model);

  const entry = tokens.find((e) => {
    return e.Name === token.replace(/ tokens?/, "");
  });
  return (
    <Popup model={model}>
      <Popup.Target as={StyledSpan}>{token}</Popup.Target>
      <Popup.Popper placement="bottom">
        <Popup.Card>
          <Popup.CloseIcon aria-label="Close" />
          <StyledBody>
            {entry && (
              <TrueFrame allowDownload entry={entry as any}></TrueFrame>
            )}
          </StyledBody>
        </Popup.Card>
      </Popup.Popper>
    </Popup>
  );
};

const StyledSpan = styled.span({
  fontWeight: "bold",
  textDecoration: "underline",
});

const StyledBody = styled(Popup.Body)({
  fontFamily: "crimsonNormal",
  color: "black",
});
