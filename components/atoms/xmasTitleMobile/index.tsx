import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import styled from "styled-components";

const StyledAnimationWrap = styled.div`
  margin: 0;
  padding: 0;
  height: 5rem;
  > div {
    height: 5rem;
    ${({ theme }) => theme.breakpoints.large} {
      display: flex;
      justify-content: left;
    }
    > svg {
      height: 5rem;
      ${({ theme }) => theme.breakpoints.large} {
        max-width: 60%;
        transform: translateX(-2.25rem) !important;
      }
      > g {
        > g {
          rect {
            fill: ${({ theme }) => theme.currentColorGroup.surface};
          }
          g {
            path {
              fill: ${({ theme }) => theme.currentColorGroup.interface};
            }
            path + path {
              stroke: ${({ theme }) => theme.currentColorGroup.surface};
            }
          }
        }
      }
    }
  }
`;

type XmasTitleMobileType = {
  pos: string;
};

import xmasTitleT from "./xmas-title-top-season.json";
import xmasTitleB from "./xmas-title-bottom-feasting.json";
const XmasTitleMobile = ({ pos }: XmasTitleMobileType) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const loadSvgData = (pos: string) =>
    pos === "top" ? xmasTitleT : xmasTitleB;
  useEffect(() => {
    setTimeout(() => {
      // lottieRef.current.goToAndStop(50); TODO
      if (lottieRef.current !== null) {
        lottieRef.current.pause();
      }
    }, 2000);
  }, []);
  return (
    <StyledAnimationWrap>
      <Lottie
        lottieRef={lottieRef}
        animationData={loadSvgData(pos)}
        loop={false}
      />
    </StyledAnimationWrap>
  );
};

export default XmasTitleMobile;
