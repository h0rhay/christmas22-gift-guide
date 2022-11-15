import { render } from "@testing-library/react";
import ImageComponent from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <ImageComponent
          className=""
          type="product"
          altText="product"
          src={"/img/authors/marc_jacobs_test.jpg"}
        />
      </ThemeContext>
    </ThemeProvider>
  );

describe("Image Component", () => {
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
