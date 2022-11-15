import { CommonSizesEntriesType } from "types/commonTypes";
import React, { useContext } from "react";
import { AppContext } from "components/ecosystem/appContext";
import styled, { css } from "styled-components";

type StyledSubTitleType = {
  size?: CommonSizesEntriesType;
  isCenter?: boolean;
  isBold?: boolean;
  lineHeight?: CommonSizesEntriesType;
  a11yMode?: boolean;
};

type SubTitlePropsType = {
  text: string;
  children?: React.ReactNode | Array<React.ReactNode>;
  className?: string;
} & StyledSubTitleType;

const subTitleDefaultProps = {
  isCenter: true,
  className: "",
};

const StyledSubTitle = styled.h3<StyledSubTitleType>`
  font-style: normal;

  ${({ theme, size, isCenter, isBold, lineHeight, a11yMode }) => css`
    color: ${theme.currentColorGroup.interface};
    font-family: ${theme.typography.fontFamily.universalSansDisplay};

    font-size: ${a11yMode
      ? theme.typography.fontSize.large
      : theme.typography.fontSize.small};
    font-weight: ${theme.typography.fontWeight.light};

    ${isBold && `font-weight: ${theme.typography.fontWeight.bold};`}
    ${isCenter && `text-align: center;`}
    ${size && `font-size: ${theme.typography.fontSize[size]};`}
    ${lineHeight && `font-height: ${theme.typography.lineHeight[lineHeight]};`}
  `}
`;

const SubTitle = ({
  text,
  children,
  className,
  ...styleProps
}: SubTitlePropsType) => {
  const { a11yMode } = useContext(AppContext);
  return (
    <StyledSubTitle
      a11yMode={a11yMode}
      className={`xmas-subtitle ${className}`}
      {...styleProps}
    >
      {text}
      {children}
    </StyledSubTitle>
  );
};

SubTitle.defaultProps = subTitleDefaultProps;

export default SubTitle;
