import { breakpoints } from "./breakpoints";
import typography from "./typography";
import milkColorGroup from "./colorGroups/milk";
import bubblegumColorGroup from "./colorGroups/bubblegum";
import yolkColorGroup from "./colorGroups/yolk";
import oliveColorGroup from "./colorGroups/olive";
import heroColorGroup from "./colorGroups/hero";
import darkColorGroup from "./colorGroups/dark";
import lightColorGroup from "./colorGroups/light";
import colors from "styles/theme/colors";
import { TypographyType, PrimitiveColorsType, ColorsGroupType } from "types";
import { ColorGroupType } from "types/colorsTypes";

const colorsGroup = {
  hero: heroColorGroup,
  milk: milkColorGroup,
  olive: oliveColorGroup,
  bubblegum: bubblegumColorGroup,
  yolk: yolkColorGroup,
  dark: darkColorGroup,
  light: lightColorGroup,
};

const colorsInputs = [
  "hero",
  "milk",
  "bubblegum",
  "yolk",
  "olive",
  "dark",
  "light",
] as const;
export type ColorGroupInputType = typeof colorsInputs[number];

export type ThemeType = {
  typography: TypographyType;
  breakpoints: any; // TODO
  colors: PrimitiveColorsType;
  colorsGroup: ColorsGroupType;
  colorGroupNames: ColorGroupInputType[];
  fallbackColorGroup: ColorGroupInputType;
  currentColorGroup: ColorGroupType;
};

const theme: ThemeType = {
  typography,
  breakpoints,
  colors,
  colorsGroup,
  colorGroupNames: Object.keys(colorsGroup) as ColorGroupInputType[],
  fallbackColorGroup: "milk", //Consider Object.keys(colorsGroup)[0];
  currentColorGroup: heroColorGroup, // dynamic changes
};

export default theme;
