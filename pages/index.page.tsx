import type { GetStaticProps } from "next";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  getLandingPageData,
  getAllCategoryData,
} from "components/ecosystem/contentApi";
import { AppContext } from "components/ecosystem/appContext";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import AccordionComponent from "components/organisms/accordion";
import FloatingNav from "components/molecules/floatingNav";
import HomepageHero from "components/organisms/homePageHero";
import { ILandingPageSchema } from "types";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import { commonAnalyticsValues } from "components/ecosystem/analytics/eventTrackers/eventsConstants";

type CategoryListTypes = {
  id: number;
  slug: string;
  title: string;
  type: string;
  tasteMaker: string;
  theme: string;
};

type LandingPageProps = {
  randomIconNamePosition: number;
  landingPageData: ILandingPageSchema;
  categoryList: Array<CategoryListTypes>;
  children: React.ReactNode;
};

const PageWrapper = styled.div<{ a11yMode: boolean }>`
  p {
    font-size: ${({ theme, a11yMode }) =>
      a11yMode
        ? theme.typography.fontSize.large
        : theme.typography.fontSize.small};
  }
`;

const LandingPage = ({
  landingPageData,
  categoryList,
  children,
}: LandingPageProps) => {
  const { a11yMode, setCategoryName } = useContext(AppContext);

  useEffect(() => {
    setCategoryName(commonAnalyticsValues.HOMEPAGE_NAME);
    new AnalyticsFactory({
      page_name: commonAnalyticsValues.HOMEPAGE_NAME,
    }).trigger();
  }, []);

  return (
    <PageWrapper a11yMode={a11yMode}>
      <ThemeContext colorGroup={a11yMode ? "dark" : "hero"}>
        <HomepageHero {...landingPageData} />
      </ThemeContext>
      <AccordionComponent categories={categoryList}>
        {children}
      </AccordionComponent>
      <FloatingNav categoryId={-1} categories={categoryList} />
    </PageWrapper>
  );
};

export default LandingPage;

export const getStaticProps: GetStaticProps = async () => {
  let categoryList = getAllCategoryData([
    "slug",
    "title",
    "type",
    "tasteMaker",
    "hoverImage",
    "theme",
  ]);
  let landingPageData = getLandingPageData(["title", "desc", "pullQuote", "landingPageImages"]);
  [categoryList, landingPageData] = await Promise.all([
    categoryList,
    landingPageData,
  ]);

  return {
    props: {
      categoryList,
      landingPageData,
    },
  };
};
