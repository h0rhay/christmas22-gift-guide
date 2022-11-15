import { render } from "@testing-library/react";
import SubTitle from "components/atoms/subtitle/subtitle";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import ThemeContext from "../../ecosystem/themeContext/ThemeContext";
import { CommonSizesEntriesType } from "types/commonTypes";

type renderSubTitleComponentType = {
  colorGroupName: string;
  subTitleProps?: {
    isBold?: boolean;
    isCenter?: boolean;
    size?: CommonSizesEntriesType;
  };
};

const defaultRenderSubTitleComponentProps = {
  colorGroupName: theme.colorGroupNames[0] as string,
  subTitleProps: {},
};

const SUBTITLE_SELECTOR = "xmas-subtitle";

const renderComponent = ({
  colorGroupName,
  subTitleProps,
}: renderSubTitleComponentType = defaultRenderSubTitleComponentProps) =>
  render(
    <ThemeProvider theme={theme}>
      <ThemeContext colorGroup={colorGroupName}>
        <SubTitle
          text="Sample test text for subtitle"
          isBold={subTitleProps?.isBold}
          size={subTitleProps?.size}
          isCenter={subTitleProps?.isCenter}
        />
      </ThemeContext>
    </ThemeProvider>
  );

describe("SubTitle", () => {
  it("Subtitle should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("SubTitle should match default params for fontSize=headingFontSize.large, fontWeight=fontWeight.light and color=colorGroup.interface and text-align=center", () => {
    const colorGroupName = theme.colorGroupNames[0];
    const colorGroup = theme.colorsGroup[colorGroupName as string];
    const { container } = renderComponent();

    const titleEl = container.getElementsByClassName(SUBTITLE_SELECTOR)[0];

    expect(titleEl).toHaveStyle(`color: ${colorGroup?.interface}`);
    expect(titleEl).toHaveStyle("font-size: 1rem;");
    expect(titleEl).toHaveStyle(
      `font-weight: ${theme.typography.fontWeight.light}`
    );
    expect(titleEl).toHaveStyle("text-align: center");
  });

  it("SubTitle should always match with currentColorGroup.interface color", () => {
    let colorGroupName = theme.colorGroupNames[0] as string;
    let colorGroup = theme.colorsGroup[colorGroupName as string];
    let { container } = renderComponent({ colorGroupName });

    expect(container.getElementsByClassName(SUBTITLE_SELECTOR)[0]).toHaveStyle(
      `color: ${colorGroup?.interface}`
    );
    colorGroupName = theme.colorGroupNames[1] as string;
    colorGroup = theme.colorsGroup[colorGroupName as string];

    ({ container } = renderComponent({ colorGroupName }));
    expect(container.getElementsByClassName(SUBTITLE_SELECTOR)[0]).toHaveStyle(
      `color: ${colorGroup?.interface}`
    );
  });

  it("SubTitle should ovewrite fontWeight with isBold param", () => {
    const colorGroupName = theme.colorGroupNames[0] as string;
    const { container } = renderComponent({
      colorGroupName,
      subTitleProps: { isBold: true },
    });

    expect(container.getElementsByClassName(SUBTITLE_SELECTOR)[0]).toHaveStyle(
      `font-weight: ${theme.typography.fontWeight.bold}`
    );
  });

  it("SubTitle should ovewrite textAlign center with isCenter param", () => {
    const colorGroupName = theme.colorGroupNames[0] as string;
    const { container } = renderComponent({
      colorGroupName,
      subTitleProps: { isCenter: false },
    });

    expect(
      container.getElementsByClassName(SUBTITLE_SELECTOR)[0]
    ).not.toHaveStyle("text-align: center");
  });

  it("SubTitle should ovewrite fontSize with size param", () => {
    const colorGroupName = theme.colorGroupNames[0] as string;
    const { container } = renderComponent({
      colorGroupName,
      subTitleProps: { size: "large" },
    });

    expect(container.getElementsByClassName(SUBTITLE_SELECTOR)[0]).toHaveStyle(
      `font-size: ${theme.typography.fontSize.large}`
    );
  });
});
