import { render } from "@testing-library/react";
import Button, { ButtonVariationType } from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = (buttonVariation?: ButtonVariationType) =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <Button type="button" variation={buttonVariation}>
          <a className="button__a" href="">
            foo
          </a>
        </Button>
      </ThemeContext>
    </ThemeProvider>
  );

describe("Button", () => {
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  // @TODO It would be great to solve the problem with screen sizes on styled-components to create additional tests
  it("Sponsor Button in Mobile View should have background sfYellow font color as sfYellow", () => {
    const { container, getByRole } = renderComponent("sponsor");
    const buttonEl = getByRole("button");
    const aEl = container.getElementsByClassName("button__a")[0];

    expect(buttonEl).toHaveStyle("background: rgba(255,226,85,1)");
    expect(aEl).toHaveStyle("color: rgba(254, 251, 240, 1)");
  });

  it("Sponsor-reverse Button as default (mobile) should have background none font color as sfYellow", () => {
    const { container, getByRole } = renderComponent("sponsor-reverse");
    const buttonEl = getByRole("button");
    const aEl = container.getElementsByClassName("button__a")[0];

    expect(buttonEl).toHaveStyle("background: none");
    expect(aEl).toHaveStyle("color: rgba(254, 251, 240, 1)");
  });
});
