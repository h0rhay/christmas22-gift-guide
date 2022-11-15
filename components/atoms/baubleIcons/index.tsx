import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import styled from "styled-components";
import { BaubleType } from "@/types/index";

const StyledAnimationWrap = styled.div`
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  > div {
    display: inline-block;
    height: 12vmin;
    min-height: 4.875rem;
    svg {
    }
  }
  path {
    fill: ${({ theme }) => theme.currentColorGroup.interface};
  }
`;

type BaubleIconType = {
  baubleType: BaubleType;
};

import Stocking from "./stocking.json";
import Pudding from "./pudding.json";
import milkCookie from "./milk-cookie.json";
import Candle from "./candle.json";
import Misletoe from "./misletoe.json";
import Tree from "./tree.json";
import Wreath from "./wreath.json";

const BaubleIcon = ({ baubleType }: BaubleIconType) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const loadSvgData = (baubleType: string) => {
    switch (baubleType) {
      case "stocking":
        return Stocking;
      case "pudding":
        return Pudding;
      case "milk-cookie":
        return milkCookie;
      case "candle":
        return Candle;
      case "misletoe":
        return Misletoe;
      case "tree":
        return Tree;
      case "wreath":
        return Wreath;
      default:
        return Pudding;
    }
  };
  useEffect(() => {
    if (lottieRef && "current" in lottieRef && lottieRef.current)
      lottieRef.current.goToAndStop(0);
  }, []);
  return (
    <StyledAnimationWrap>
      <Lottie
        lottieRef={lottieRef}
        animationData={loadSvgData(baubleType)}
        loop={false}
        onMouseEnter={() =>
          lottieRef && lottieRef.current && lottieRef.current.play()
        }
        onMouseLeave={() =>
          lottieRef && lottieRef.current && lottieRef.current.goToAndStop(0)
        }
      />
    </StyledAnimationWrap>
  );
};

export default BaubleIcon;
