import { render } from "@testing-library/react";
import PageContent from ".";
// import { ThemeProvider } from "styled-components";
import ThemeProvider from "../../ecosystem/themeContext/ThemeContext";
// import Theme from "__mocks__/mockTheme";

const content = { pageText: "", headingText: "" };
// test
describe("PageContent", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <ThemeProvider>
        <PageContent {...content} />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
