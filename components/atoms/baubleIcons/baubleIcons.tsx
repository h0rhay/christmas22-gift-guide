import { render } from "@testing-library/react";
import BaubleIcon from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <BaubleIcon baubleType="pudding" />
      </ThemeContext>
    </ThemeProvider>
  );

describe("BaubleIcon", () => {
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
