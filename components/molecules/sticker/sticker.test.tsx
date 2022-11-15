import { render } from "@testing-library/react";
import Sticker from "./index";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { StickerType, StickersContentTypes } from "types";

const THEME = "olive";

const testData: StickerType = {
  id: 1,
  title: "Ornare massa vestibulum",
  type: "comment",
  theme: THEME,
  content:
    "Nunc nunc faucibus non et fusce. Quis scelerisque phasellus netus porta magna nunc eget ornare volutpat. Tellus mi mi quis id tellus volutpat semper enim. Consequat, nunc ipsum at sit egestas vulputate. Vitae dignissim metus, accumsan morbi ante pharetra ut. Consequat, nunc ipsum at sit egestas vulputate. Vitae dignissim metus, accumsan morbi ante pharetra ut.",
};

const recipeContent = ["1 step", "2", "3"];
const commentContent =
  "Nunc nunc faucibus non et fusce. Quis scelerisque phasellus netus porta magna nunc eget ornare volutpat. Tellus mi mi quis id tellus volutpat semper enim. Consequat, nunc ipsum at sit egestas vulputate. Vitae dignissim metus, accumsan morbi ante pharetra ut. Consequat, nunc ipsum at sit egestas vulputate. Vitae dignissim metus, accumsan morbi ante pharetra ut.";

const renderComponent = (type: StickersContentTypes) => {
  const dataWithTestingType = {
    ...testData,
    type,
    content: type === "recipe" ? recipeContent : commentContent,
  };
  return render(
    <ThemeProvider theme={theme}>
      <Sticker data={dataWithTestingType} />
    </ThemeProvider>
  );
};

const primaryColor = theme.colorsGroup[THEME].surface;
const secondaryColor = theme.colorsGroup[THEME].interface;

describe("Stickers view", () => {
  it("Sticker of recipe type should match snapshot", () => {
    const { container } = renderComponent("recipe");
    expect(container).toMatchSnapshot();
  });
  it("Sticker of comment type should match snapshot", () => {
    const { container } = renderComponent("comment");
    expect(container).toMatchSnapshot();
  });
});
let textElement: Element;
let headingElement: Element;
let sticker: Element;
let headingFontFamily = theme.typography.fontFamily.formula;
let textFontFamily = theme.typography.fontFamily.universalSansDisplay;

describe("Recipe type of the sticker testing", () => {
  beforeAll(() => {
    const { container } = renderComponent("recipe");
    textElement = container.getElementsByClassName(
      "contentRecipe"
    )[0] as Element;
    headingElement = container.getElementsByClassName("stickers")[0] as Element;
    headingFontFamily = theme.typography.fontFamily.apoc;
    sticker = container.getElementsByClassName("sticker")[0] as Element;
  });
  it("Check font-family for comment type. Must be apoc headingElement & Universal sans main", () => {
    expect(textElement).toHaveStyle(`font-family: ${textFontFamily}`);
    expect(headingElement).toHaveStyle(`font-family: ${headingFontFamily}`);
  });
  it("Check textElement and headingElement to be of stickers theme color", () => {
    expect(headingElement).toHaveStyle(`color: ${secondaryColor}`);
    expect(textElement).toHaveStyle(`color: ${secondaryColor}`);
  });
});

describe("Comment type of the sticker testing", () => {
  beforeAll(() => {
    const { container } = renderComponent("comment");
    textElement = container.getElementsByClassName(
      "contentComment"
    )[0] as Element;
    headingElement = container.getElementsByClassName("stickers")[0] as Element;
    sticker = container.getElementsByClassName("sticker")[0] as Element;
    headingFontFamily = theme.typography.fontFamily.formula;
  });

  it("Check font-family for comment type. Must be Formula condensed headingElement & Universal sans main", () => {
    expect(textElement).toHaveStyle(`font-family: ${textFontFamily}`);
    expect(headingElement).toHaveStyle(`font-family: ${headingFontFamily}`);
  });
  it("Check sticker background color to be taken from sticker theme", () => {
    expect(sticker).toHaveStyle(`background-color: ${primaryColor}`);
  });
});
