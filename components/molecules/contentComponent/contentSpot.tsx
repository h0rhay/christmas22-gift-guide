import { useContext ,useEffect,useState} from "react";
import Button, { ButtonVariationType } from "components/atoms/button";
import { AppContext } from "components/ecosystem/appContext";
import ImageComponent from "components/atoms/imageComponent";
import Video from "components/molecules/video";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { IContentComponent, ContentComponentType } from "types";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import Sticker from "components/molecules/sticker";

const Container = styled.div<{ stickerIsAligned: boolean }>`
${({ theme, stickerIsAligned}) => css`
  display: flex;
  flex-direction: column;
  ${theme.breakpoints.large} {
    flex-direction: row;
    div[class^="sticker__StyledStickerWrap"] {
      ${stickerIsAligned && `margin-bottom: ${theme.typography.space.extraSmallGap}`};
    }
  }
  ${stickerIsAligned && `align-items: center;`}
  margin-top: ${theme.typography.space.mediumGap};

  div[class^="contentSpot__VideoWrapper"] {
    margin-bottom: ${theme.typography.space.extraSmallGap};
  }
  `}
`;

const ContentCard = styled.div<{
  type: ContentComponentType;
  a11yMode: boolean;
}>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .content-spot__arrow {
    display: none;
  }

  .content-spot__button {
    margin-top: auto;
  }

  ${({ theme, type, a11yMode }) => {
    const sponsorStyle = css`
      align-items: center;
      padding: 0;

      h1,
      h2,
      p {
        color: black;
      }

      a {
        text-align: start;
      }

      div[class^="imageComponent__StyledImage"] {
        ${theme.breakpoints.large} {
          min-height: 25rem;
        }
        height: 100%;
      }

      .content-spot__content-container {
        justify-content: center;
        align-items: flex-start;
        ${theme.breakpoints.small} {
          margin: ${theme.typography.space.extraSmallGap} 0;
          align-items: center;
        }
      }

      .content-spot__title {
        font-family: ${theme.typography.fontFamily.avalonDemi};
      }

      .content-spot__button {
        display: flex;
        ${a11yMode &&
        css`
          background: ${theme.colors.black};
          a {
            color: ${theme.colors.white};
          }
          :hover {
            outline: 1px solid ${theme.colors.black};
            background: ${theme.colors.white};
            opacity: 100%;
            a {
              color: ${theme.colors.black};
            }
          }
        `}
      }

      ${theme.breakpoints.large} {
        flex-direction: row-reverse;

        .content-spot__content-container {
          padding: calc(2 * ${theme.typography.space.large});
          p {
            width: 15rem;
          }
        }

        a {
          text-align: center;
        }
      }
    `;
    switch (type) {
      case "row":
        return css`
          > div:first-of-type {
            flex: 1;
          }
          div[class^="imageComponent__StyledImage"] {
            margin: 0 0 ${({ theme }) => theme.typography.space.smallGap} 0;
          }
          align-items: center;
          flex-direction: column;
          ${theme.breakpoints.large} {
            flex-direction: row;
            div[class^="imageComponent__StyledImage"] {
              margin: 0 ${({ theme }) => theme.typography.space.smallGap} 0 0;
            }
          }
        `;
      case "row-reverse":
        return css`
          div[class^="imageComponent__StyledImage"] {
            margin: 0 0 ${({ theme }) => theme.typography.space.smallGap} 0;
          }
          align-items: center;
          flex-direction: column;
          ${theme.breakpoints.large} {
            flex-direction: row-reverse;
            div[class^="imageComponent__StyledImage"] {
              margin: 0 0 0 ${({ theme }) => theme.typography.space.smallGap};
            }
          }
        `;
      case "stack":
        return css`
          & ~ div[class^="contentSpot__ContentCard"] {
            margin-top: ${({ theme }) => theme.typography.space.smallGap};
          }
          div[class^="imageComponent__StyledImage"] {
            margin-bottom: ${({ theme }) => theme.typography.space.smallGap};
          }
            ${theme.breakpoints.large} {
              flex-direction: column;
              & ~ div[class^="contentSpot__ContentCard"] {
                margin-top: 0;
                margin-left: ${({ theme }) => theme.typography.space.smallGap};
              }
            }
          `;   
      case "sponsor":
        return css`
          ${theme.breakpoints.large} {
            > div {
              flex: 50%;
              aspect-ratio: unset;
            }
            > div:first-of-type {
              @media (min-width: 70rem) {
                flex: 80%;
              }
            }
          }
          background-color: ${theme.colors.white};
          ${sponsorStyle}
          a {
            color: black;
          }
        `;
      case "sponsor-reverse":
        return css`
          ${theme.breakpoints.large} {
            > div {
              flex: 50%;
              aspect-ratio: unset;
            }
            > div:first-of-type {
              @media (min-width: 70rem) {
                flex: 80%;
              }
            }
          }
          background-color: ${theme.colors.sfYellow};
          a {
            color: black;
          }

          ${sponsorStyle}

          ${theme.breakpoints.large} {
            a {
              color: white;
            }
          }
        `;

      default:
        return;
    }
  }}
`;

const ImageWrapper = styled(ImageComponent)`
  flex-direction: column;
  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      flex: 1;
      width: 100px;
      flex-direction: row;
    }
  `}
`;

const VideoWrapper = styled.div`
  flex-direction: column;
  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      flex: 1;
      flex-direction: row;
    }
  `}
`;

const ContentDescription = styled.div<{ a11yMode: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    @supports not (gap: 1rem) {
      margin: 0.5rem;
    }
  }
  div {
    h1 {
      font-family: ${({ theme, a11yMode }) =>
        a11yMode
          ? theme.typography.fontFamily.default
          : theme.typography.fontFamily.formula};
      font-size: 2.75rem;
    }
    h2 {
      font-family: ${({ theme, a11yMode }) =>
        a11yMode
          ? theme.typography.fontFamily.default
          : theme.typography.fontFamily.formula};
      font-size: 2rem;
    }
    .content-card-subtitle,
    .content-spot__description {
      margin-bottom: ${({ theme }) => theme.typography.space.small};
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: ${({ theme, a11yMode }) =>
        a11yMode
          ? theme.typography.fontSize.large
          : theme.typography.fontFamily.small};
      word-wrap: break-word;
    }
  }
  button {
    width: 14rem;
    a {
      font-size: 1rem;
    }
  }
  ${({ theme }) => css`
    ${theme.breakpoints.large} {
      flex: 1;
    }
  `}
`;

const ContentSpot = ({ type, content }: IContentComponent) => {
  const { a11yMode, categoryName } = useContext(AppContext);
  const [stickerIsAligned, setStickerIsAligned] = useState(false)
  const buttonVariation = (
    type.includes("sponsor") ? type : "reverse"
  ) as ButtonVariationType;

  const onClickButtonHandler: Function = (
    title: string,
    eventLabel: string
  ) => {
    new AnalyticsFactory({
      ga_eventaction: type.includes("sponsor")
        ? ClickEventActions.advert
        : ClickEventActions.link,
      ga_eventlabel: type.includes("sponsor") ? title : eventLabel,
      page_name: categoryName,
    }).trigger();
  };

  useEffect(()=>{
    content.map((c)=>{
     if (c.sticker && content.length > 1)
      setStickerIsAligned(true)
    })
  })

  return (
    <Container stickerIsAligned={stickerIsAligned}>
      {content.map(
        (
          { image, video, sticker, title, subtitle, step, description, button },
          index
        ) => {
          
          return (
            <ContentCard key={index} type={type} a11yMode={a11yMode}>
              {(!image && !video && !sticker) && <></>}
              {sticker && <Sticker data={sticker} />}
              {image && <ImageWrapper
                  type={`content-${image.type}`}
                  altText="product"
                  credit={image.credit}
                  src={image.url}
                />}
              {video && 
              <VideoWrapper>
                  <Video
                    id={index.toString()}
                    altText={video.landscapeVideoId}
                    imgId={video.imgId}
                    landscapeVideoId={video.landscapeVideoId}
                    portraitVideoId={video.portraitVideoId}
                  />
                </VideoWrapper>}
              <ContentDescription
                a11yMode={a11yMode}
                className="content-spot__content-container"
              >
                <div>
                  {subtitle && <h2>{step && subtitle}</h2>}
                  {title && <h1 className="content-spot__title">{title}</h1>}
                  {subtitle && (
                    <h2 className="content-card-subtitle">
                      {!step && subtitle}
                    </h2>
                  )}
                  {description && (
                    <p className="content-spot__description">{description}</p>
                  )}
                </div>
                {button?.url && (
                  <Button
                    type="button"
                    variation={buttonVariation}
                    className="content-spot__button"
                    onClick={() => onClickButtonHandler(title, button.text)}
                  >
                    <Link href={button.url} passHref>
                      <a target="_blank">{button.text}</a>
                    </Link>
                  </Button>
                )}
              </ContentDescription>
            </ContentCard>
          );
        }
      )}
    </Container>
  );
};

export default ContentSpot;
