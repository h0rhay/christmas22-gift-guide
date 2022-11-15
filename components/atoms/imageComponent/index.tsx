import { useState, useContext } from "react";
import { AppContext } from "components/ecosystem/appContext";
import Image from "next/image";
import styled, { css } from "styled-components";

export const StyledImage = styled.div<{ type: string; a11yMode: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${({ a11yMode }) =>
      a11yMode ? "grayscale(100%)!important" : "none"};
  }

  ${({ type }) => {
    switch (type) {
      case "product":
        return css`
          @supports not (aspect-ratio: 2/3) {
            padding-top: 150%;
          }
          @supports (aspect-ratio: 2/3) {
            aspect-ratio: 2/3;
            height: 100%;
          }
        `;
      case "author":
        return css`
          width: 21.75rem;
          height: 16.8125rem;
          div {
            aspect-ratio: 4/3;
          }
          img {
            border-radius: ${({ theme }) => theme.typography.space.medium};
          }
        `;
      case "polaroid":
        return css`
          width: 13.75rem;
          height: 13.75rem;
          div {
            aspect-ratio: 1/1;
          }
        `;
      case "content-small":
        return css`
          height: unset;
          // These dimension properties are for small content to look good
          // in both content component and in full width content on 'festive-fun'
          ${({ theme }) => theme.breakpoints.large} {
            max-height: 26rem;
            max-width: 22rem;
          }

          // Safari desktop specific styles
          @media (min-width: 768px) {
            @media not all and (min-resolution: 0.001dpcm) {
              @supports (-webkit-appearance: none) and
                (stroke-color: transparent) {
                max-height: 33rem;
              }
            }
          }

          @supports not (aspect-ratio: 2/3) {
            padding-top: 130%;
          }
          @supports (aspect-ratio: 2/3) {
            aspect-ratio: 2/3;
          }
        `;
      case "content-medium":
        return css`
          height: unset;
          @supports not (aspect-ratio: 3/4) {
            padding-top: 130%;
          }
          @supports (aspect-ratio: 3/4) {
            aspect-ratio: 3/4;
          }
        `;
      case "content-large":
        return css`
          height: unset;
          @supports not (aspect-ratio: 5/3) {
            padding-top: 75%;
          }
          @supports (aspect-ratio: 5/3) {
            aspect-ratio: 5/3;
          }
        `;
      default:
        return;
    }
  }};
`;
type ImageComponent = {
  src: string;
  type?: string;
  altText: string;
  priority?: boolean;
  className?: string;
  layout?: string;
  credit?: string;
  onError?: (err: Error) => void;
};

const ImageComponent = (props: ImageComponent) => {
  const { src, type, altText, priority, className, credit } = props;
  const { a11yMode } = useContext(AppContext);
  const fallback = "/img/xmas-pudding-glitter-ball-hand-drawn.svg";
  const imageSrc = src || fallback;
  const [imgSrc, setImgSrc] = useState(imageSrc);
  return (
    <StyledImage
      type={type || ""}
      className="image-component__container"
      a11yMode={a11yMode}
    >
      <Image
        className={className || ""}
        src={imgSrc}
        layout="fill"
        placeholder="blur"
        blurDataURL={imgSrc}
        onError={() => {
          setImgSrc(fallback);
        }}
        alt={altText ? altText : "fallback image"}
        title={credit}
        priority={priority}
      />
    </StyledImage>
  );
};

export default ImageComponent;
