import React, { SVGProps } from "react";

declare global {
  interface Window {
    utag: {
      link: Function;
      view: Function;
    };
  }
}

export type IStock = {
  "Stock Quantity Available to Purchase": string;
};

export type IProductDescription = {
  id: string;
  pdpLink?: string;
  imageLink?: string;
  brand: string | boolean;
  productName?: string;
};

export type IPrice = {
  price: string | boolean;
};

export type InitialProps = {
  json: Promise<any>;
  statusCode: boolean;
};
export type CarouselPositionTypes = keyof CarouselsProductsTypes;

type UtagType = {
  link: Function;
  view: Function;
};
export type CarouselsProductsTypes = {
  top?: IProductDetails[];
  bottom?: IProductDetails[];
};

export type IProductDetails = {
  pdpLink?: string;
  imageLink?: string;
  brand: string | boolean;
  productName?: string;
  price: string | boolean;
  altText?: string;
};

export type RandomImagePathType = {
  src: string;
  alt: string;
};

export type ILandingPageSchema = {
  id?: number;
  title?: string;
  desc: string;
  pullQuote: string;
  landingPageImages: RandomImagePathType[];
};

export type VideoType = {
  imgId: string;
  landscapeVideoId: string;
  portraitVideoId: string;
  description?: string;
};

export type IContent = {
  image: {
    url: string;
    type: string;
    credit?: string;
  };
  video: VideoType;
  sticker: StickerType;
  baubleType: BaubleType;
  title: string;
  subtitle: string;
  step?: boolean;
  description: string;
  button: {
    url: string;
    text: string;
  };
  className: string;
};

export type ContentComponentType =
  | "iconTitle"
  | "row-reverse"
  | "row"
  | "stack"
  | "sponsor"
  | "sponsor-reverse";

export type IContentComponent = {
  type: ContentComponentType;
  content: IContent[];
};

export type ICategorySchema = {
  id?: number;
  slug?: string;
  content?: string;
  title?: string;
  subtitle?: string;
  type?: string;
  theme?: string;
  desc?: string;
  tasteMaker?: string;
  hoverImage?: string;
  image?: {
    src: string;
    alt: string;
    credit?: string;
  };
  heroCta?: {
    link: string;
    text: string;
  };
  topHeading?: {
    content: ITopHeading[];
  };
  carousel?: CarouselDataType;
  contentComponent?: IContentComponent[];
  pullQuote?: string;
  landingPageImages?: RandomImagePathType[];
  video?: "video";
};

export type ITopHeading = {
  baubleType: BaubleType;
  title: string;
  description: string;
};

export type CarouselDataType = {
  top?: string[];
  bottom?: string[];
};

export type StickerType = {
  id: number;
  type: StickersContentTypes;
  theme: string;
  title?: string;
  baubleType: BaubleType;
  content?: Array<string> | string;
  button?: ButtonPropType;
};

export type ButtonPropType = {
  url: string;
  text: string;
};
export type BaubleType =
  | "candle"
  | "milk-cookie"
  | "misletoe"
  | "pudding"
  | "stocking"
  | "tree"
  | "wreath";

export type StickersContentTypes = "recipe" | "comment";

export type IKeyOfCategory = keyof ICategorySchema;

export type FramePathType = {
  className?: string;
};

export type FrameOptionsType = "mirror" | "painting" | "cloud";

export type FrameType = {
  type: FrameOptionsType;
};

export type PrimitiveGreyColorType = {
  main: string;
  mid: string;
  light: string;
};

export type PrimitiveColorsType = {
  red: string;
  bubblegum: string;
  olive: string;
  yolk: string;
  sfYellow: string;
  milk: string;
  milkTransparent: string;
  whiteTransparent: string;
  black: string;
  white: string;
  grey: PrimitiveGreyColorType;
};

export type ColorsGroupType = {
  [colorGroupName: string]: ColorGroupType;
};

export type TypographyType = {
  fontFamily: FontFamilyType;
  fontWeight: FontWeightType;
  fontSize: FontSizeType;
  headingFontSize: CommonSizesType;
  lineHeight: CommonSizesType;
  letterSpacing: CommonSizesType;
  fontStyle: FontStyleType;
  space: CommonSizesType;
};

export type FontFamilyType = {
  formula: string;
  apoc: string;
  universalSansDisplay: string;
  avalonDemi: string;
  default: string;
};

export type FontWeightType = {
  light: number;
  regular: number;
  medium: number;
  bold: number;
};

export type FontSizeType = {
  small: string;
  large: string;
  xlarge: string;
  medium: string;
};

export type FontStyleType = {
  normal: string;
  italic: string;
};

/**Icons types from node_modules */
export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export declare type IconType = (props: IconBaseProps) => JSX.Element;
export declare function IconBase(
  props: IconBaseProps & {
    attr?: {};
  }
): JSX.Element;
