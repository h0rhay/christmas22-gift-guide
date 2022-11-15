import { render } from "@testing-library/react";
import ContentComponent from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const props = [
  {
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
  },
];

describe("ContentComponent", () => {
  it("should match snapshot", () => {
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <ContentComponent content={props} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
