import React from "react";
import styled from "styled-components";
import { FrameType } from "types/";

const Container = styled.div<{ enableSvgBackground: string }>`
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;

  svg {
    enable-background: ${({ enableSvgBackground }) => enableSvgBackground};
  }

  .frame__corner {
    fill: ${({ theme }) => theme.currentColorGroup.surface};
    stroke: none;
    stroke-miterlimit: 10;
    stroke-width: 3;
  }

  .frame__in {
    fill: none;
    stroke: ${({ theme }) => theme.currentColorGroup.interface};
    stroke-miterlimit: 10;
    stroke-width: 3;
  }

  .frame__out {
    fill: none;
    stroke: ${({ theme }) => theme.currentColorGroup.interface};
    stroke-miterlimit: 10;
    stroke-width: 3;
  }
`;

type FramePropsType = {
  className: string;
  dPathCornerFrame: string;
  dPathInFrame: string;
  dPathOutFrame: string;
  viewBox: string;
} & FrameType;

const defaultImageProps = {
  className: "",
  type: "mirror",
  viewBox: "0 0 1180 1450",
};

const Frame = ({
  className,
  dPathCornerFrame,
  dPathInFrame,
  dPathOutFrame,
  viewBox,
}: FramePropsType) => {
  const enableSvgBackground = `new ${viewBox}}`;

  return (
    <Container
      className={`svg-frame-container ${className}`}
      enableSvgBackground={enableSvgBackground}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        xmlSpace="preserve"
        className={className}
      >
        <path className="frame__corner" d={dPathCornerFrame} />
        <path className="frame__in" d={dPathInFrame} />
        <path className="frame__out" d={dPathOutFrame} />
      </svg>
    </Container>
  );
};

Frame.defaultProps = defaultImageProps;

export default Frame;
