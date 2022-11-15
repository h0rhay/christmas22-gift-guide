import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { AppContext } from "components/ecosystem/appContext";
import { BsPlayCircle } from "react-icons/bs";

const StyledButton = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin: auto;
  height: 3rem;
  width: 3rem;
  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      height: 5rem;
      width: 5rem;
    }
  `};
  //mix-blend-mode: difference;
  font-size: ${({ theme }) => theme.typography.headingFontSize.xLarge};
  color: ${({ theme }) => theme.currentColorGroup.surface};
  > svg {
    //mix-blend-mode: difference;
    color: ${({ theme }) => theme.currentColorGroup.surface};
    height: 3rem;
    width: 3rem;
    ${({ theme }) => css`
      ${theme.breakpoints.large} {
        height: 5rem;
        width: 5rem;
      }
    `};
    path {
      fill: ${({ theme }) => theme.currentColorGroup.surface};
    }
  }
  &:hover {
  }
`;

const StyledVideoPoster = styled.div<{
  isFallbackImg: boolean;
  a11yMode: boolean;
}>`
  img {
    ${({ isFallbackImg }) => css`
      object-fit: cover;
      ${isFallbackImg && `object-fit: fill;`}
    `}
    filter: ${({ a11yMode }) =>
      a11yMode ? "grayscale(100%)!important" : "none"};
  }
`;

type VideoPoster = {
  imgId: string | undefined;
  altText: string;
  handlePlay: () => void;
};

const VideoPoster = ({ imgId, altText, handlePlay }: VideoPoster) => {
  const fallback = `/img/xmas-pudding-glitter-ball-hand-drawn.svg`;
  const [isFallbackImg, setIsFallbackImg] = useState(false);
  const [imgSrc, setImgUrl] = useState(
    `https://images.selfridges.com/is/image/selfridges/${imgId}?qlt=80&fmt=jpg&scl=1`
  );
  const { a11yMode } = useContext(AppContext);
  return (
    <StyledVideoPoster isFallbackImg={isFallbackImg} a11yMode={a11yMode}>
      <Image
        data-test-id={`video-poster-img`}
        src={imgSrc || fallback}
        layout="fill"
        placeholder="blur"
        blurDataURL={imgSrc || fallback}
        alt={altText ? `video-poster-image` : `fallback image`}
        onError={() => {
          setImgUrl(fallback);
          setIsFallbackImg(true);
        }}
      />
      <StyledButton  data-test-id='play-video' onClick={handlePlay}>
        <BsPlayCircle />
        <span className="sr-only">Play Video</span>
      </StyledButton>
    </StyledVideoPoster>
  );
};

export default VideoPoster;
