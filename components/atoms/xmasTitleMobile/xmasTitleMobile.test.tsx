import { render } from "@testing-library/react";
import XmasTitleMobile from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = (pos: string) =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <XmasTitleMobile pos={pos} />
      </ThemeContext>
    </ThemeProvider>
  );

describe("XmasTitleMobile", () => {
  describe("when pos prop is TOP", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent("top");
      expect(container).toMatchSnapshot();
    });
  });
  describe("when pos prop is BOTTOM", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent("bottom");
      expect(container).toMatchSnapshot();
    });
  });
});
