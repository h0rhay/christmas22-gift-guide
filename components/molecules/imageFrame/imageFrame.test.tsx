import { render } from "@testing-library/react";
import ImageFrame from "./imageFrame";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import ThemeContext from "../../ecosystem/themeContext/ThemeContext";
import { FrameOptionsType } from "types/";

const renderComponent = ({
  colorGroupName = theme.colorGroupNames[0],
  frameType = "mirror",
}) =>
  render(
    <ThemeProvider theme={theme}>
      <ThemeContext colorGroup={colorGroupName}>
        <ImageFrame
          src="/img/selfridges_logo.svg"
          alt="imageframe__image--alt"
          type={frameType as FrameOptionsType}
        />
      </ThemeContext>
    </ThemeProvider>
  );

let container: HTMLElement;
let frameType: FrameOptionsType;

describe("Image Frame", () => {
  it("Mirror Mobile should match snapshot", () => {
    const { container } = renderComponent({ frameType: "mirror" });
    expect(container).toMatchSnapshot();
  });

  it("Cloud Mobile should match snapshot", () => {
    const { container } = renderComponent({ frameType: "cloud" });
    expect(container).toMatchSnapshot();
  });

  it("Painting Desktop Should match snapshot", () => {
    const { container } = renderComponent({ frameType: "painting" });
    expect(container).toMatchSnapshot();
  });

  describe("Mirror shape", () => {
    beforeEach(() => {
      frameType = "mirror";
      ({ container } = renderComponent({ frameType }));
    });

    it("Container should have 3 children mobile and desktop and the image", () => {
      const svgContainer = container.getElementsByClassName(
        "imageframe__container"
      )[0];
      expect(svgContainer?.children.length).toBe(3);
    });

    it("Frame in/out border color must be colorgroup.interface and corner should be colorgroup.surface", () => {
      const colorGroupName = theme.colorGroupNames[0];
      const colorGroup = theme.colorsGroup[colorGroupName as string];

      const cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      const inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      const outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });

    it("Mirror mobile display block and desktop display none", () => {
      const svgFrameMobile =
        container.getElementsByClassName("svg__frame--mobile")[0];
      expect(svgFrameMobile).toHaveStyle("display: block");

      const svgFrameDesktop = container.getElementsByClassName(
        "svg__frame--desktop"
      )[0];
      expect(svgFrameDesktop).toHaveStyle("display: none");
    });

    it("Frame in/out border color should change with theme ", () => {
      let colorGroupName = theme.colorGroupNames[0];
      let colorGroup = theme.colorsGroup[colorGroupName as string];

      let cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      let inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      let outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");

      colorGroupName = theme.colorGroupNames[1];
      colorGroup = theme.colorsGroup[colorGroupName as string];
      ({ container } = renderComponent({ frameType, colorGroupName }));
      cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });
  });

  describe("Cloud shape", () => {
    beforeEach(() => {
      frameType = "cloud";
      ({ container } = renderComponent({ frameType }));
    });

    it("Container should have 3 children mobile and desktop and the image", () => {
      const svgContainer = container.getElementsByClassName(
        "imageframe__container"
      )[0];
      expect(svgContainer?.children.length).toBe(3);
    });

    it("Frame in/out border color must be colorgroup.interface and corner should be colorgroup.surface", () => {
      const colorGroupName = theme.colorGroupNames[0];
      const colorGroup = theme.colorsGroup[colorGroupName as string];

      const cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      const inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      const outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });

    it("Mirror mobile display block and desktop display none", () => {
      const svgFrameMobile =
        container.getElementsByClassName("svg__frame--mobile")[0];
      expect(svgFrameMobile).toHaveStyle("display: block");

      const svgFrameDesktop = container.getElementsByClassName(
        "svg__frame--desktop"
      )[0];
      expect(svgFrameDesktop).toHaveStyle("display: none");
    });

    it("Frame in/out border color should change with theme ", () => {
      let colorGroupName = theme.colorGroupNames[0];
      let colorGroup = theme.colorsGroup[colorGroupName as string];

      let cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      let inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      let outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");

      colorGroupName = theme.colorGroupNames[1];
      colorGroup = theme.colorsGroup[colorGroupName as string];
      ({ container } = renderComponent({ frameType, colorGroupName }));
      cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });
  });

  describe("Painting shape", () => {
    beforeEach(() => {
      frameType = "painting";
      ({ container } = renderComponent({ frameType }));
    });

    it("Container should have 3 children mobile and desktop and the image", () => {
      const svgContainer = container.getElementsByClassName(
        "imageframe__container"
      )[0];
      expect(svgContainer?.children.length).toBe(3);
    });

    it("Frame in/out border color must be colorgroup.interface and corner should be colorgroup.surface", () => {
      const colorGroupName = theme.colorGroupNames[0];
      const colorGroup = theme.colorsGroup[colorGroupName as string];

      const cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      const inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      const outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });

    it("Mirror mobile display block and desktop display none", () => {
      const svgFrameMobile =
        container.getElementsByClassName("svg__frame--mobile")[0];
      expect(svgFrameMobile).toHaveStyle("display: block");

      const svgFrameDesktop = container.getElementsByClassName(
        "svg__frame--desktop"
      )[0];
      expect(svgFrameDesktop).toHaveStyle("display: none");
    });

    it("Frame in/out border color should change with theme ", () => {
      let colorGroupName = theme.colorGroupNames[0];
      let colorGroup = theme.colorsGroup[colorGroupName as string];

      let cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      let inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      let outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");

      colorGroupName = theme.colorGroupNames[1];
      colorGroup = theme.colorsGroup[colorGroupName as string];
      ({ container } = renderComponent({ frameType, colorGroupName }));
      cornerEl = container.getElementsByClassName("frame__corner")[0];
      expect(cornerEl).toHaveStyle("stroke: none");
      expect(cornerEl).toHaveStyle(`fill: ${colorGroup?.surface}`);

      inFrameEl = container.getElementsByClassName("frame__in")[0];
      expect(inFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(inFrameEl).toHaveStyle("fill: none");

      outFrameEl = container.getElementsByClassName("frame__out")[0];
      expect(outFrameEl).toHaveStyle(`stroke: ${colorGroup?.interface}`);
      expect(outFrameEl).toHaveStyle("fill: none");
    });
  });
});
