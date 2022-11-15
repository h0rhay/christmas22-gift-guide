import { CommonSizesEntriesType } from "types/commonTypes";
import React, { ComponentType } from "react";
import styled, { css } from "styled-components";

type StyledTitleType = {
  size?: CommonSizesEntriesType;
  isCenter?: boolean;
  isBold?: boolean;
  as?: string | ComponentType<any> | undefined;
};

type TitlePropsType = {
  children?: React.ReactNode | Array<React.ReactNode> | string;
  className?: string;
} & StyledTitleType;

const titleDefaultProps = {
  isCenter: true,
  className: "",
};

const StyledTitle = styled.h2<StyledTitleType>`
  font-style: normal;
  text-transform: uppercase;

  ${({ theme, size, isCenter, isBold }) => css`
    font-family: ${theme.typography.fontFamily.apoc};
    font-weight: ${theme.typography.fontWeight.light};

    ${isBold && `font-weight: ${theme.typography.fontWeight.bold};`}
    ${isCenter && `text-align: center;`}
    ${size
      ? `font-size: ${theme.typography.headingFontSize[size]};`
      : `font-size: ${theme.typography.headingFontSize.medium};`}
  `}
`;

const Title = ({ children, className, as, ...styleProps }: TitlePropsType) => (
  <StyledTitle as={as} className={`xmas-title ${className}`} {...styleProps}>
    {children}
  </StyledTitle>
);

Title.defaultProps = titleDefaultProps;

export default Title;
