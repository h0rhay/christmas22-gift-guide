import { RandomImagePathType } from "@/types/index";
import SiteWidthWrapper from "components/atoms/siteWidthWrapper";
import XmasTitleMobile from "components/atoms/xmasTitleMobile";
import ImageFrame from "components/molecules/imageFrame/imageFrame";
import styled, { css } from "styled-components";
import typography from "styles/theme/typography";

const StyledHomepageHero = styled(SiteWidthWrapper)`
  :last-child {
    margin-bottom: ${typography.space.large};
    padding-bottom: calc(${typography.space.large} + ${typography.space.small});
  }
  display: flex;
  > div {
    margin-top: ${typography.space.large};
  }
  .text-content {
    * + * {
      margin-top: ${typography.space.large};
    }
    *:first-child {
      margin-top: ${typography.space.small};
    }
    *:last-child {
      margin-bottom: ${typography.space.large};
    }
    max-width: 90%;
    ${({ theme }) => css`
      h4 {
        font-family: ${theme.typography.fontFamily.apoc};
        font-weight: ${theme.typography.fontWeight.light};
        font-size: ${theme.typography.fontSize.xlarge};
      }
      ${theme.breakpoints.small} {
        margin: 0 auto;
      }
    `}
  }
  @media (min-width: 580px) and (max-width: 960px) {
    .mobile-image-frame {
      margin: -3.5rem 0;
    }
    h1 {
      position: relative;
      z-index: 1;
    }
  }
  ${({ theme }) => css`
    ${theme.breakpoints.small} {
      flex-direction: column;
      text-align: center;
      .mobile-image-frame {
        display: block;
      }
      .desktop-image-frame {
        display: none;
      }
    }
    :last-child {
      padding-bottom: ${typography.space.smallGap};
    }
  `}

  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      flex-direction: row;
      > * {
        flex: 1;
      }
      div[class^="xmasTitleMobile__"] {
        &:nth-of-type(3) {
        }
      }
      .mobile-image-frame,
      .svg__frame--mobile {
        display: none;
      }
      .desktop-image-frame {
        display: flex;
      }
      .svg__frame--desktop {
        display: block;
        svg {
          position: absolute;
          top: 50%;
          left: -0.125rem;
          transform: translateY(-50%);
          width: 101%;
        }
      }
    }
  `}
`;

type HomepageHeroType = {
  desc: string;
  pullQuote: string;
  landingPageImages: RandomImagePathType[];
};

export const generateRandomImagePath = (landingPageImages: RandomImagePathType[]): RandomImagePathType => {
  const randomHeroImageIndex = Math.floor(Math.random() * landingPageImages.length);
  return landingPageImages[randomHeroImageIndex] as RandomImagePathType;
};

const HomepageHero = ({ desc, pullQuote, landingPageImages }: HomepageHeroType) => {
  const imageData = generateRandomImagePath(landingPageImages);
  return (
    <StyledHomepageHero>
      <div>
        <h1>
          <XmasTitleMobile pos="top" />
          <span className="sr-only">Seasons</span>
        </h1>
        <ImageFrame
          src={imageData?.src}
          alt={imageData?.alt}
          type="mirror"
          className="mobile-image-frame"
        />
        <h1>
          <XmasTitleMobile pos="bottom" />
          <span className="sr-only">Feastings</span>
        </h1>
        <div className="text-content">
          <h4>{pullQuote}</h4>
          <p>{desc}</p>
        </div>
      </div>

      <ImageFrame
        src={imageData?.src}
        alt={imageData?.alt}
        type="mirror"
        className="desktop-image-frame"
      />
    </StyledHomepageHero>
  );
};

export default HomepageHero;
