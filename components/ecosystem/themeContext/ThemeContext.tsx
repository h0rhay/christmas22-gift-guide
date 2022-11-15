import React, { ReactChild, ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "styles/theme";

const ColoredSurface = styled.div`
  background-color: ${({ theme }) => theme.currentColorGroup.surface};
  * {
    color: ${({ theme }) => theme.currentColorGroup.interface};
  }
`;

type ThemeContextProps = {
  colorGroup?: string;
  children: ReactChild | Array<ReactChild> | ReactNode;
};

const ThemeContext = ({
  children,
  colorGroup = theme.fallbackColorGroup,
}: ThemeContextProps) => {
  const currentColorGroup =
    theme.colorsGroup[colorGroup] ||
    theme.colorsGroup[theme.fallbackColorGroup];
  return (
    <ThemeProvider theme={{ ...theme, currentColorGroup }}>
      <ColoredSurface className="colored-surface">{children}</ColoredSurface>
    </ThemeProvider>
  );
};

export default ThemeContext;
