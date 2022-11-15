import React, { useContext } from "react";
import { AppContext } from "components/ecosystem/appContext";
import styled, { css } from "styled-components";

const StyledAccordionHeader = styled.div`
  display: flex;
  position: absolute;
  top: -1.9rem;
  left: 0;

  ${({ theme }) => `
    ${theme.breakpoints.large} {
      margin-left: -4rem;
      left: auto;
    }
  `}

  svg {
    .accordion-header__path {
      fill: ${({ theme }) => theme.currentColorGroup.surface};
    }
  }

  .--left-shape {
    transform: scale(-1, 1);
    display: none;
    margin-right: -0.51rem;

    ${({ theme }) => `
      margin-left: ${theme.typography.space.large};
      ${theme.breakpoints.large} {
        display: block;
      }
    `}
  }

  .--right-shape {
    margin-left: -0.51rem;
  }
`;

const CenterShapeContainer = styled.div<{ a11yMode: boolean }>`
  background: ${({ theme }) => theme.currentColorGroup.surface};
  width: ${({ a11yMode }) => (a11yMode ? "12rem" : "6rem")};
  padding-left: 1.5rem;

  ${({ theme }) => theme.breakpoints.large} {
    text-align: center;
    width: 9rem;
    padding-left: 0;
  }

  h4 {
    position: relative;
    top: 30%;
    margin-left: -0.35rem;
    ${({ theme, a11yMode }) => css`
      font-size: ${a11yMode
        ? theme.typography.fontSize.large
        : theme.typography.fontSize.small};
      color: ${theme.currentColorGroup.interface};
      font-height: ${theme.typography.lineHeight.small};
      font-weight: ${theme.typography.fontWeight.regular};

      ${theme.breakpoints.large} {
        top: 40%;
      }
    `};
  }
`;

const HeaderShape = ({ svgClassName }: { svgClassName: string }) => (
  <svg
    width="64"
    height="32"
    viewBox="0 0 64 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={svgClassName}
  >
    <path
      d="M11.5295 0H0V32H37.4525L64 32C48.8641 32 37.6617 22.8055 31.1436 12.6639C26.7072 5.76137 19.7347 0 11.5295 0Z"
      className="accordion-header__path"
    />
  </svg>
);

const AccordionHeader = ({ title }: { title: string }) => {
  const { a11yMode } = useContext(AppContext);
  return (
    <StyledAccordionHeader>
      <HeaderShape svgClassName="--left-shape" />
      <CenterShapeContainer a11yMode={a11yMode}>
        <h4 className="accordion-header__title">{title}</h4>
      </CenterShapeContainer>
      <HeaderShape svgClassName="--right-shape" />
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
