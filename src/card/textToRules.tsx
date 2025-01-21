import { Tooltip } from "@workday/canvas-kit-react/tooltip";
import { keywords } from "../ruleConstants";
import { Token } from "./Token";
import styled from "@emotion/styled";
const StyledSpan = styled.span({
  fontWeight: "bold",
  textDecoration: "underline",
});

export const textToRules = (ruleText: string) => {
  return ruleText
    .replaceAll(/<\/?b>/g, "")
    .split(combinedRegex)
    .map((entry, i) => {
      if (entry.match(keywordRegex)) {
        return <Keyword keyword={entry} key={"kw" + i} />;
      }
      if (entry.match(tokenRegex)) {
        return <Token key={"token" + i} token={entry} />;
      }
      if (entry.match(/<br>/)) {
        return <br key={"br" + i} />;
      }
      if (entry.match(italicsRegex)) {
        return <i key={"ital" + i}>{entry.replace(/<\/?i>/g, "")}</i>;
      }
      return entry;
    });
};

const keywordRegexPattern = Object.keys(keywords).join("|");
// "Swift|Toll|Collapsing|Search|Ritual|Instill|Immutable|Howl|Aegis|Amalgam|Subsume|Trap!|Unveil";

const keywordRegex = new RegExp("^(" + keywordRegexPattern + ")$");

const italicsRegex = /<i>[^<]*<\/i>/g;

const tokenRegexPattern =
  "Acorn|Burn|Bury|Contract|Din|Home|Research|Shield|Squirrel|Sting";
const tokenRegex = new RegExp(tokenRegexPattern);

const combinedRegex = new RegExp(
  "(" +
    keywordRegexPattern +
    "|" +
    tokenRegexPattern +
    "|" +
    "<br> *\n" +
    "|" +
    "<i>[^<]*</i>" +
    ")",
  "g"
);

const Keyword = ({ keyword }: { keyword: string }) => {
  return (
    <Tooltip title={keywords[keyword]}>
      <StyledSpan>{keyword}</StyledSpan>
    </Tooltip>
  );
};
