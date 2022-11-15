import { render } from "@testing-library/react";
import LandingPage from "./index.page";
import { ThemeProvider } from "styled-components";
import Theme from "__mocks__/mockTheme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const mockLandingPageData = {
  desc: "Dolore aliquip nostrud culpa ut nisi do do magna elit. Proident quis nostrud adipisicing ea aliqua incididunt. Lorem occaecat quis esse velit exercitation fugiat ipsum reprehenderit nulla ex ut deserunt. Officia dolore eiusmod et nulla aliquip ea ad cillum.",
  pullQuote: "I am a pullquote",
  landingPageImages: [
    {
      src: "/img/homePage/xmas-glitter-ball-reclining-lady-rct.webp",
      alt: "Lady reclining under giant glitter ball in the style of a christmas pudding",
    },
    {
      src: "/img/homePage/xmas-glitter-ball-reclining-lady-rct-2.webp",
      alt: "Lady reclining under giant glitter ball in the style of a christmas pudding",
    },
    {
      src: "/img/homePage/xmas-glitter-ball-reclining-lady-rct-3.webp",
      alt: "Lady reclining under giant glitter ball in the style of a christmas pudding",
    },
  ]
};
const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <LandingPage
          randomIconNamePosition={0}
          landingPageData={mockLandingPageData}
          categoryList={[]}
          children={undefined}
        />
      </ThemeContext>
    </ThemeProvider>
  );

describe("Welcome page", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "floor").mockReturnValue(1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "floor").mockRestore();
  });
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
