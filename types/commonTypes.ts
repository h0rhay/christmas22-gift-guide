export type CommonSizesType = {
  tinyGap?: "0.5rem";
  extraSmallGap?: string;
  smallGap?: string;
  mediumGap?: string;
  largeGap?: string;
  small: string;
  medium: string;
  large: string;
  extraSmall?: string;
  xlarge?: string;
};

export type LineHeight = CommonSizesType & {
  heading: string;
};

const commonSizesEntryItems = [
  "small",
  "medium",
  "large",
  "xlarge",
  "extraSmall",
] as const;
export type CommonSizesEntriesType = typeof commonSizesEntryItems[number];
