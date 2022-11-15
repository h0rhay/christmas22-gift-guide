import { render } from "@testing-library/react";
import Video from ".";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const renderComponent = (
  id: string,
  altText: string,
  imgId?: string,
  landscapeVideoId?: string,
  portraitVideoId?: string
) =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <Video
          id={id}
          altText={altText}
          imgId={imgId}
          landscapeVideoId={landscapeVideoId}
          portraitVideoId={portraitVideoId}
        />
      </ThemeContext>
    </ThemeProvider>
  );

describe("Video Player", () => {
  describe("Video with all properties", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_9x16"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video missing an image", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-2",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_9x16"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video when only img and landscape video are provided", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-3",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "SLF_XMAS_Guide_DeadHungry_16x9"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video when only  img and portrait video are provided", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-4",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "SLF_XMAS_Guide_DeadHungry_9x16"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video when only landscape video is provided", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-5",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video when only portrait video is provided", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-6",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_9x16"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video when no properties are provided", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-7",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video with wrong landscape ID", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-8",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "landscapeWrongId",
        "SLF_XMAS_Guide_DeadHungry_9x16"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video with wrong portrait ID", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-9",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "SLF_XMAS_Guide_DeadHungry_16x9",
        "portraitWrongId"
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Video with wrong IDs for both types", () => {
    it("should match snapshot", () => {
      const { container } = renderComponent(
        "some-id-10",
        "video-poster-image-SLF_XMAS_Guide_DeadHungry_16x9",
        "SLF_XMAS_Guide_DeadHungry_16x9_Test_Thumb",
        "landscapeWrongId",
        "portraitWrongId"
      );
      expect(container).toMatchSnapshot();
    });
  });
});
