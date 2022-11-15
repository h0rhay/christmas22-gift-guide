import type { GetStaticProps, GetStaticPaths } from "next";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import type {
  ILandingPageSchema,
  IContentComponent,
  CarouselsProductsTypes,
  VideoType,
} from "types";
import build from "components/ecosystem/build";
import { AppContext } from "components/ecosystem/appContext";
import {
  getCategoryBySlug,
  getAllCategoryData,
  getLandingPageData,
} from "components/ecosystem/contentApi";
import AccordionComponent from "components/organisms/accordion";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import FloatingNav from "components/molecules/floatingNav";
import ProductCarousel from "components/organisms/productCarousel";
import HomepageHero from "components/organisms/homePageHero";
import ContentComponent from "components/molecules/contentComponent";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import Button from "components/atoms/button";
import ImageFrame from "components/molecules/imageFrame/imageFrame";
import Link from "next/link";
import Video from "components/molecules/video";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import { ITopHeading } from "types";
import ContentTitle from "components/molecules/contentComponent/contentTitle";
import { splitSponsorContentSpot } from "components/molecules/contentComponent/contentComponentUtils";

type ICategoryList = {
  id: number;
  slug: string;
  title: string;
  type: string;
  tasteMaker: string;
  hoverImage?: string;
  theme: string;
};

type ICategoryPage = {
  id: number;
  theme: string;
  subtitle: string;
  desc: string;
  tasteMaker: string;
  heroCta: {
    link?: URL;
    text?: string;
  };
  image: {
    src?: string;
    alt?: string;
    type?: "mirror" | "painting" | "cloud";
    credit?: string;
  };
  topHeading?: {
    content: ITopHeading[];
  };
  products: CarouselsProductsTypes;
  contentComponent: Array<IContentComponent>;
  categoryList: Array<ICategoryList>;
  landingPageData: ILandingPageSchema;
  iconIdxs: Array<number>;
  video?: VideoType;
  lastRefreshTimestamp: Number;
  sponsorContent?: IContentComponent[];
};

const PageWrapper = styled.div<{ a11yMode: boolean }>`
  p {
    font-size: ${({ theme, a11yMode }) =>
      a11yMode
        ? theme.typography.fontSize.large
        : theme.typography.fontSize.small};
  }
  .category-hero-image-frame {
    div[class^="imageComponent__StyledImage"] {
      max-height: unset;
    }
    // This fixes the large frame border around image-frame
    // component messing with the app generic spacing between components
    @media (min-width: 576px) {
      margin: -4.25rem 0 -2.8125rem 0;
    }
    @media (min-width: 690px) {
      margin: -8.5rem 0 -5.625rem 0;
    }
  }
  .topCarousel {
    margin-top: 0;
  }
`;

const CategoryHero = styled.div`
  .hero-cta {
    display: inline-block;
    width: auto;
    padding-left: ${({ theme }) => theme.typography.space.extraSmallGap};
    padding-right: ${({ theme }) => theme.typography.space.extraSmallGap};
    margin-bottom: ${({ theme }) => theme.typography.space.mediumGap};
    position: relative;
    z-index: 1;
  }
  .cat-header-text {
    margin-bottom: ${({ theme }) => theme.typography.space.smallGap};
    ${({ theme }) => theme.breakpoints.large} {
      max-width: 70%;
    }
  }
  h3 {
    margin: 0 0 ${({ theme }) => theme.typography.space.smallGap} 0;
    font-style: italic;
  }
  .top-content-heading {
    padding-top: 0;
    margin-top: ${({ theme }) => theme.typography.space.small};
    margin-bottom: ${({ theme }) => theme.typography.space.smallGap};
  }
`;

export default function Category({
  id,
  subtitle,
  desc,
  image,
  heroCta,
  products,
  contentComponent,
  topHeading,
  categoryList,
  landingPageData,
  video,
  lastRefreshTimestamp,
  sponsorContent,
}: ICategoryPage) {
  const { a11yMode, setCategoryName, setCategoryTitle, setCategoryId } =
    useContext(AppContext);
  useEffect(() => {
    const page_name = categoryList[id]?.slug as string;
    setCategoryName(page_name);
    setCategoryTitle(categoryList[id]?.title);
    setCategoryId(id);
    new AnalyticsFactory({ page_name }).trigger();
  }, []);

  const ctaOnClickHandler = (buttonText: string, categoryName: string) => {
    new AnalyticsFactory({
      ga_eventaction: ClickEventActions.link,
      ga_eventlabel: buttonText,
      page_name: categoryName,
    }).trigger();
  };

  return (
    <PageWrapper a11yMode={a11yMode}>
      <ThemeContext colorGroup={a11yMode ? "dark" : "hero"}>
        <HomepageHero {...landingPageData} />
      </ThemeContext>
      <AccordionComponent selectedCategoryId={id} categories={categoryList}>
        <CategoryHero>
          {subtitle && <h3>{subtitle}</h3>}
          {desc && <p className="cat-header-text">{desc}</p>}
          {console.log("ISR refresh: ", lastRefreshTimestamp)}
          {heroCta.link && (
            <Button
              type="button"
              variation="ghost"
              className="hero-cta"
              onClick={() =>
                ctaOnClickHandler(
                  heroCta.text as string,
                  categoryList[id]?.slug as string
                )
              }
            >
              <Link href={heroCta.link} passHref>
                <a target="_blank">{heroCta.text}</a>
              </Link>
            </Button>
          )}

          {video && (
            <Video
              id={`category-${categoryList[id]?.slug}-video`}
              altText={video.landscapeVideoId}
              {...video}
            />
          )}
          {image.src && (
            <ImageFrame
              src={image?.src}
              alt={image?.alt || "Error loading image"}
              type={image?.type || "mirror"}
              credit={image?.credit}
              className="category-hero-image-frame"
            />
          )}
          {topHeading && (
            <ContentTitle
              content={topHeading.content}
              className="top-content-heading"
            />
          )}
        </CategoryHero>
        {products.top && (
          <ProductCarousel className="topCarousel" products={products.top} />
        )}
        
        {contentComponent && <ContentComponent content={contentComponent} />}
        
        {products.bottom && (
          <ProductCarousel products={products.bottom} className={""} />
        )}
        {sponsorContent && <ContentComponent content={sponsorContent} />}
      </AccordionComponent>
      <FloatingNav categoryId={id} categories={categoryList} />
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let page = getCategoryBySlug(params?.category as string, [
    "title",
    "subtitle",
    "type",
    "desc",
    "tasteMaker",
    "image",
    "heroCta",
    "theme",
    "contentComponent",
    "topHeading",
    "video",
  ]);

  let carouselData = getCategoryBySlug(params?.category as string, [
    "carousel",
  ]).carousel;

  let categoryList = getAllCategoryData([
    "slug",
    "title",
    "type",
    "tasteMaker",
    "hoverImage",
    "theme",
  ]);

  let landingPageData = getLandingPageData([
    "title",
    "desc",
    "pullQuote",
    "landingPageImages",
  ]);

  [page, carouselData, categoryList, landingPageData] = await Promise.all([
    page,
    carouselData,
    categoryList,
    landingPageData,
  ]);
  const products = await build(carouselData);
  const lastRefreshTimestamp = new Date().toLocaleString();
  const sponsorContentSpot = splitSponsorContentSpot(page.contentComponent);

  return {
    props: {
      ...page,
      ...sponsorContentSpot,
      products,
      categoryList,
      landingPageData,
      lastRefreshTimestamp,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryPages = getAllCategoryData(["slug"]);

  return {
    paths: categoryPages.map((page) => {
      return {
        params: {
          category: page.slug,
        },
      };
    }),
    fallback: false,
  };
};
