import { render } from "@testing-library/react";
import Heading from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <Heading size="large">
          foo
        </Heading>
      </ThemeContext>
    </ThemeProvider>
  );

describe("Heading", () => {
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
