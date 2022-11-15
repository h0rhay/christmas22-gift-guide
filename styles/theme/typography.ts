import {
  FontFamilyType,
  FontSizeType,
  FontStyleType,
  FontWeightType,
  TypographyType,
} from "types";
import { CommonSizesType, LineHeight } from "../../types/commonTypes";

const fontFamily: FontFamilyType = {
  formula: '"Formula-Condensed",sans-serif',
  apoc: "Apoc-Revelations",
  universalSansDisplay: "Universal-Sans",
  avalonDemi: "Avalon-Demi",
  default: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
};

const fontWeight: FontWeightType = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const fontWeightEntryItems = ["light", "regular", "medium", "bold"] as const;
export type fontWeightEntriesType = typeof fontWeightEntryItems[number];

const fontSize: FontSizeType = {
  small: "1rem",
  medium: "1.25rem",
  large: "1.5rem",
  xlarge: "2rem",
};

const headingFontSize: CommonSizesType = {
  // small: "clamp(1.424rem, 1.75vw, 1.75rem)",
  small: "clamp(1.3rem, calc(1.3rem + ((1vw - 7.68px) * 0.6944)), 1.75rem)",
  medium: "clamp(2rem, calc(2rem + ((1vw - 7.68px) * 0.3472)), 2.25rem);",
  large: "clamp(2.3rem, calc(2.3rem + ((1vw - 7.68px) * 1.3889)), 4rem)",
  xlarge: "clamp(4rem, calc(4rem + ((1vw - 7.68px) * 2.7778)), 6rem)",
};

const lineHeight: LineHeight = {
  heading: "1.1",
  small: "1.2",
  medium: "1.5",
  large: "1.75",
};

const letterSpacing: CommonSizesType = {
  small: "1px",
  medium: "2px",
  large: "3px",
};

const fontStyle: FontStyleType = {
  normal: "normal",
  italic: "italic",
};

const fontStyleEntryItems = ["normal", "italic"] as const;
export type fontStyleEntriesType = typeof fontStyleEntryItems[number];

const space: CommonSizesType = {
  tinyGap: "0.5rem",
  extraSmallGap: "2rem",
  smallGap: "2.5rem",
  mediumGap: "4rem",
  largeGap: "5rem",
  extraSmall: ".5rem",
  small: "1rem",
  medium: "1.5rem",
  large: "2rem",
};

const typography: TypographyType = {
  fontFamily,
  fontWeight,
  fontSize,
  headingFontSize,
  lineHeight,
  letterSpacing,
  fontStyle,
  space,
};

export default typography;
