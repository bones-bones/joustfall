import { Tooltip } from "@workday/canvas-kit-react/tooltip";
import { keywords } from "../ruleConstants";
import { Token } from "./Token";
import styled from "@emotion/styled";
const StyledSpan = styled.span({
  fontWeight: "bold",
  textDecoration: "underline",
});

export const textToRules = (ruleText: string) => {
  return ruleText.split(combinedRegex).map((entry, i) => {
    if (entry.match(keywordRegex)) {
      return <Keyword keyword={entry} key={"kw" + i} />;
    }
    if (entry.match(tokenRegex)) {
      return <Token key={"token" + i} token={entry} />;
    }
    if (entry.match(/<br>/)) {
      return <br key={"br" + i} />;
    }
    return entry;
  });
};

const keywordRegexPattern =
  "Swift|Toll|Feedback|Search|Ritual|Instill|Immutable|Howl|Aegis|Amalgam|Subsume|Trap!|Unveil";

const keywordRegex = new RegExp(keywordRegexPattern);

const tokenRegexPattern =
  "burn tokens?|freeze tokens?|home tokens?|squirrel tokens?|shield tokens?|contract tokens?|research tokens?|bury tokens?";
const tokenRegex = new RegExp(tokenRegexPattern);
const combinedRegex = new RegExp(
  "(" + keywordRegexPattern + "|" + tokenRegexPattern + "|" + "<br> *\n" + ")",
  "g"
);

const Keyword = ({ keyword }: { keyword: string }) => {
  return (
    <Tooltip title={keywords[keyword]}>
      <StyledSpan>{keyword}</StyledSpan>
    </Tooltip>
  );
};
