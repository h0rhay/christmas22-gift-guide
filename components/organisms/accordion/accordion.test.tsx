import { render, cleanup } from "@testing-library/react";
import Accordion from "./index";
import { ThemeProvider } from "styled-components";
import Theme from "__mocks__/mockTheme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import theme, { ColorGroupInputType } from "styles/theme";

const categoriesList = [
  {
    id: 0,
    slug: "beauty",
    title: "Recipe for a sustainable christmas",
    type: "Beauty",
    tasteMaker: "By Artist Name",
    theme: "milk" as ColorGroupInputType,
  },
  {
    id: 1,
    slug: "food",
    title: "Food page",
    type: "Food",
    tasteMaker: "Foobar",
    theme: "olive" as ColorGroupInputType,
  },
];

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      events: {
        on: jest.fn,
        off: jest.fn,
      },
    };
  },
}));

const renderComponent = ({ colorGroupName = theme.colorGroupNames[0] }) =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup={colorGroupName}>
        <Accordion categories={categoriesList}>
          <h1>This is an expected title</h1>
          <p>This is an expected description</p>
        </Accordion>
      </ThemeContext>
    </ThemeProvider>
  );

describe("Accordion test", () => {
  afterEach(cleanup);
  it("should match snapshot", () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it("Accordion should have the same elements of categories list size", () => {
    const { container } = renderComponent({});
    const accordionTabs = container.getElementsByClassName(
      "xmas-styled-accordion"
    );
    expect(accordionTabs.length).toBe(categoriesList.length);
  });

  it("Accordion should have the same elements of categories list size", () => {
    const { container } = renderComponent({});
    const accordionTabs = container.getElementsByClassName(
      "xmas-styled-accordion"
    );
    expect(accordionTabs.length).toBe(categoriesList.length);
  });

  it("Accordion title, subtitle and accordion header color should match with categoriesList.theme", () => {
    const { container } = renderComponent({});
    const categoryAccordionBackground =
      theme.colorsGroup[categoriesList[0].theme];
    const accordionTab = container.getElementsByClassName(
      "xmas-styled-accordion"
    )[0];
    const title = accordionTab?.getElementsByClassName("accordion-title")[0];
    const subtitle =
      accordionTab?.getElementsByClassName("accordion-subtitle")[0];
    const accordionHeaderTitle = accordionTab?.getElementsByClassName(
      "accordion-header__title"
    )[0];
    expect(title).toHaveStyle(
      `color: ${categoryAccordionBackground?.interface}`
    );
    expect(subtitle).toHaveStyle(
      `color: ${categoryAccordionBackground?.interface}`
    );
    expect(accordionHeaderTitle).toHaveStyle(
      `color: ${categoryAccordionBackground?.interface}`
    );
  });

  it("Accordion odd should have different font family and font weight from accordion even", () => {
    const { container } = renderComponent({});
    const accordionEvenTab = container.getElementsByClassName(
      "xmas-styled-accordion"
    )[0];
    const accordionOddTab = container.getElementsByClassName(
      "xmas-styled-accordion"
    )[1];
    const titleEvenAccordion =
      accordionEvenTab?.getElementsByClassName("accordion-title")[0];
    const titleOddAccordion =
      accordionOddTab?.getElementsByClassName("accordion-title")[0];

    expect(titleEvenAccordion).toHaveStyle(
      `font-family: ${theme.typography.fontFamily.apoc}`
    );
    expect(titleEvenAccordion).toHaveStyle(
      `font-weight: ${theme.typography.fontWeight.light}`
    );
    expect(titleOddAccordion).toHaveStyle(
      `font-family: ${theme.typography.fontFamily.formula}`
    );
    expect(titleOddAccordion).toHaveStyle(
      `font-weight: ${theme.typography.fontWeight.bold}`
    );
  });
});
