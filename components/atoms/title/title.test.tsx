import { render } from "@testing-library/react";
import Title from "components/atoms/title/title";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import ThemeContext from "../../ecosystem/themeContext/ThemeContext";
import { CommonSizesEntriesType } from "types/commonTypes";

type renderTitleComponentType = {
  colorGroupName: string;
  titleProps?: {
    isBold?: boolean;
    isCenter?: boolean;
    size?: CommonSizesEntriesType;
  };
};

const defaultRenderTitleComponentProps = {
  colorGroupName: theme.colorGroupNames[0] as string,
  titleProps: {},
};

const TITLE_SELECTOR_CLASS_NAME = "xmas-title";

const renderComponent = ({
  colorGroupName,
  titleProps,
}: renderTitleComponentType = defaultRenderTitleComponentProps) =>
  render(
    <ThemeProvider theme={theme}>
      <ThemeContext colorGroup={colorGroupName}>
        <Title
          isBold={titleProps?.isBold}
          size={titleProps?.size}
          isCenter={titleProps?.isCenter}
        >
          Sample test text for title
        </Title>
      </ThemeContext>
    </ThemeProvider>
  );

describe("Title", () => {
  it("Square should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("Title should match default params for fontSize=headingFontSize.large, fontWeight=fontWeight.light and color=colorGroup.interface and text-align=center", () => {
    const colorGroupName = theme.colorGroupNames[0];
    const colorGroup = theme.colorsGroup[colorGroupName as string];
    const { container } = renderComponent();

    const titleEl = container.getElementsByClassName(
      TITLE_SELECTOR_CLASS_NAME
    )[0];

    expect(titleEl).toHaveStyle(`color: ${colorGroup?.interface}`);
    expect(titleEl).toHaveStyle("font-size: 1.5em;");
    expect(titleEl).toHaveStyle(
      `font-weight: ${theme.typography.fontWeight.light}`
    );
    expect(titleEl).toHaveStyle("text-align: center");
    expect(titleEl).toHaveStyle("text-transform: uppercase");
    expect(titleEl).toHaveStyle("font-style: normal");
  });

  it("Title should always match with currentColorGroup.interface color", () => {
    let colorGroupName = theme.colorGroupNames[0] as string;
    let colorGroup = theme.colorsGroup[colorGroupName as string];
    let { container } = renderComponent({ colorGroupName });

    expect(
      container.getElementsByClassName(TITLE_SELECTOR_CLASS_NAME)[0]
    ).toHaveStyle(`color: ${colorGroup?.interface}`);
    colorGroupName = theme.colorGroupNames[1] as string;
    colorGroup = theme.colorsGroup[colorGroupName as string];

    ({ container } = renderComponent({ colorGroupName }));
    expect(
      container.getElementsByClassName(TITLE_SELECTOR_CLASS_NAME)[0]
    ).toHaveStyle(`color: ${colorGroup?.interface}`);
  });

  it("Title should ovewrite fontWeight with isBold param", () => {
    const colorGroupName = theme.colorGroupNames[0] as string;
    const { container } = renderComponent({
      colorGroupName,
      titleProps: { isBold: true },
    });

    expect(
      container.getElementsByClassName(TITLE_SELECTOR_CLASS_NAME)[0]
    ).toHaveStyle(`font-weight: ${theme.typography.fontWeight.bold}`);
  });

  it("Title should ovewrite textAlign center with isCenter param", () => {
    const colorGroupName = theme.colorGroupNames[0] as string;
    const { container } = renderComponent({
      colorGroupName,
      titleProps: { isCenter: false },
    });

    expect(
      container.getElementsByClassName(TITLE_SELECTOR_CLASS_NAME)[0]
    ).not.toHaveStyle("text-align: center");
  });
});
