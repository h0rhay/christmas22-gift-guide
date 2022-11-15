import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import ErrorComponent from ".";

let container: HTMLElement;

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <ErrorComponent />
      </ThemeContext>
    </ThemeProvider>
  );

describe("ErrorComponent", () => {
  beforeEach(() => {
    container = renderComponent().container;
  });

  it("should match screenshot", () => {
    expect(container).toMatchSnapshot();
  });
});
