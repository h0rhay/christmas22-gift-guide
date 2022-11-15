import { render } from "@testing-library/react";
import ContentSpot from "./contentSpot";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const props = {
  type: "row-reverse",
  content: [
    {
      image: {
        url: "/foobar.webp",
        type: "medium",
      },
      title: "foo",
      subtitle: "bar",
      step: false,
      description: "foobar",
      button: {
        url: "foobar.com",
        text: "foobar",
      },
    },
  ],
};

describe("ContentSpot", () => {
  it("should match snapshot - row-reverse", () => {
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <ContentSpot {...props} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot("row-reverse");
  });

  it("should match snapshot - row", () => {
    props.type = "row";
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <ContentSpot {...props} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot("row");
  });

  it("should match snapshot - stack", () => {
    props.type = "stack";
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <ContentSpot {...props} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot("stack");
  });
});
