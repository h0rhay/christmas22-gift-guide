import { ButtonPropType, StickerType } from "types";
import React, { useContext } from "react";
import styled, { css } from "styled-components";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import { AppContext } from "components/ecosystem/appContext";
import { mobile, tabletAndMobile } from "styles/theme/breakpoints";
import BaubleIcon from "components/atoms/baubleIcons";
import Button from "components/atoms/button";
import { BsArrowRight } from "react-icons/bs";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";

const StyledStickerWrap = styled.div`
  color: ${({ theme }) => theme.currentColorGroup.interface};
  z-index: 9;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => theme.typography.space.medium}
    ${({ theme }) => theme.typography.space.large};

  .colored-surface {
    background-color: transparent;
  }
`;

const StyledSticker = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.typography.space.medium};
  justify-content: start;
  min-width: min-content;
  max-width: 20rem;
  ${tabletAndMobile} {
    transform: rotate(-5deg);
  }
  ${mobile} {
    transform: rotate(-2.5deg);
  }
  transform: rotate(-6.97deg);

  @supports not (aspect-ratio: 1/1) {
    min-height: 22rem;
    ${tabletAndMobile} {
      min-height: 16rem;
    }
  }

  @supports (aspect-ratio: 1/1) {
    aspect-ratio: 1/1;
  }

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.currentColorGroup.surface};

  .recipe-list {
    margin: 0;
    padding: 0;
  }
  > div > div {
    position: relative;
    right: 0rem;
    top: -1rem;
    height: 3.875rem;
  }

  > div > div > div {
    height: 7vmin;
    width: 3.875rem;
    min-height: 3.875rem;
    right: -1rem;
    top: 0rem;
    position: relative;
`;

const Content = styled.p<{ isRecipe: boolean; a11yMode: boolean }>`
  ${({ isRecipe, theme, a11yMode }) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    ${!isRecipe && `margin: ${theme.typography.space.extraSmall} 0;`}
    color: ${theme.currentColorGroup.interface};
    font-family: ${
      a11yMode
        ? theme.typography.fontFamily.default
        : theme.typography.fontFamily.universalSansDisplay
    };
    display: -webkit-box;
    -webkit-line-clamp: 30;
    -webkit-box-orient: vertical;
    font-size: ${isRecipe ? "inherit" : theme.typography.fontSize.medium}};
    button {
      display: flex;
      outline: none;
      :hover {
        background-color: transparent;
        color: ${({ theme }) => theme.currentColorGroup.interface};
        outline: none;
        opacity: 0.8;
      }
      :hover .buttonArrow {
        transform: translate(0.5rem);
        transition: 0.5s linear;
      }
    }
  `}
`;

const StyledTitle = styled.h4<{
  isRecipe: boolean;
  titleIsLong: boolean;
  firstWordIsLong: boolean;
  a11yMode: boolean;
}>`
  ${({ theme, isRecipe, a11yMode, titleIsLong, firstWordIsLong }) => css`
    font-family: ${theme.typography.fontFamily.formula};
    ${a11yMode && `font-family: ${theme.typography.fontFamily.default}`};
    ${isRecipe &&
    !a11yMode &&
    `font-family: ${theme.typography.fontFamily.apoc}`};

    overflow: hidden;
    ${mobile} {
      overflow: initial;
      padding-right: 0;
      ${firstWordIsLong && `font-size: 1.8rem;`}
    }
    font-size: ${a11yMode
      ? theme.typography.fontSize.large
      : theme.typography.fontSize.xlarge};
    display: -webkit-box;
    -webkit-line-clamp: ${titleIsLong ? "4" : "3"};
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: ${theme.currentColorGroup.interface};
    text-transform: uppercase;

    .stickers {
      color: ${theme.currentColorGroup.interface};
      font-family: ${isRecipe
        ? theme.typography.fontFamily.apoc
        : theme.typography.fontFamily.formula};
    }
  `}
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecipeRowStyle = styled.li`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.currentColorGroup.interface};
  color: ${({ theme }) => theme.currentColorGroup.interface};
  margin-top: ${({ theme }) => theme.typography.space.extraSmall};
`;

const Arrow = styled(BsArrowRight)`
  margin-left: 0.8rem;
  fill: ${({ theme }) => theme.currentColorGroup.interface};
`;

type StickerElementType = {
  data: StickerType;
};

const Sticker = ({ data }: StickerElementType) => {
  const { type, title, button, content, theme, baubleType } = data;
  const { a11yMode, categoryId, categoryName } = useContext(AppContext);
  const isRecipe = type === "recipe";
  const titleIsLong = (title && title.split(" ").length > 3) || false;
  const firstWordIsLong = ((title && title.split(" ")[0]?.length) || 0) > 10;

  const onClickHandler = (button: ButtonPropType): void => {
    new AnalyticsFactory({
      ga_eventaction: ClickEventActions.link,
      ga_eventlabel: button.text || "Shop",
      page_name: categoryName,
    }).trigger();
    window.open(button.url);
  };

  const getTheme = (id: number, theme: string): string => {
    if (a11yMode) {
      if (id % 2 !== 0) {
        return "light";
      } else {
        return "dark";
      }
    } else {
      return theme;
    }
  };
  return (
    <StyledStickerWrap>
      <ThemeContext colorGroup={getTheme(categoryId, theme)}>
        <StyledSticker className="sticker">
          <Top>
            {title && (
              <StyledTitle
                className="stickers"
                a11yMode={a11yMode}
                isRecipe={isRecipe}
                titleIsLong={titleIsLong}
                firstWordIsLong={firstWordIsLong}
              >
                {title}
              </StyledTitle>
            )}
            <BaubleIcon baubleType={baubleType} />
          </Top>
          <Content
            isRecipe={isRecipe}
            className={isRecipe ? "contentRecipe" : "contentComment"}
            a11yMode={a11yMode}
          >
            {isRecipe ? (
              <ul className="recipe-list">
                {(content as Array<string>).map(
                  (recipeRow: string, idx: number) => (
                    <RecipeRowStyle key={`${idx}_${recipeRow}`}>
                      {recipeRow}
                    </RecipeRowStyle>
                  )
                )}
              </ul>
            ) : (
              content
            )}
            {button?.url && (
              <Button
                type="button"
                variation="grey"
                className="sticker-cta"
                onClick={() => onClickHandler(button)}
              >
                {button.text || "Shop now"}
                <Arrow size={24} className="buttonArrow" />
              </Button>
            )}
          </Content>
        </StyledSticker>
      </ThemeContext>
    </StyledStickerWrap>
  );
};

export default Sticker;
