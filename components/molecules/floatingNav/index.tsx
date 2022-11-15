import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AppContext } from "components/ecosystem/appContext";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import CircleButton from "components/atoms/circleButton";
import Share from "components/molecules/share";
import { routeClickHandler } from "components/ecosystem/routeClickHandler";
import { useRouter } from "next/router";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";

const Wrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 2.5rem;
  height: 15rem;
  top: 15rem;
  right: 1rem;
  z-index: 10;
  button {
    margin-bottom: 0.6rem;
  }
`;

type ICategories = {
  id: number;
  slug: string;
};

type IFloatingNav = {
  categories: Array<ICategories>;
  categoryId: number;
};

const FloatingNav = ({ categories, categoryId }: IFloatingNav) => {
  const router = useRouter();
  const parentUrl = process.env.NEXT_PUBLIC_PARENT_URL as string;
  const url =
    categoryId > -1
      ? `${parentUrl}/?category=${categories[categoryId]?.slug}`
      : parentUrl;

  const { a11yMode, setA11yMode, categoryName } = useContext(AppContext);

  const onClickAccesssibilityHandler = (a11yMode: boolean) => {
    new AnalyticsFactory({
      page_name: categoryName,
      ga_eventaction: ClickEventActions.button,
      ga_eventlabel: "Access",
    }).trigger();
    setA11yMode(a11yMode);
  };

  return (
    <ThemeContext colorGroup={a11yMode ? "dark" : "olive"}>
      <Wrapper
        data-test-id="floatingNav"
        drag="y"
        dragTransition={{
          min: -200,
          max: 300,
          bounceDamping: 8,
        }}
        whileDrag={{ scale: 1.1 }}
      >
        {categoryId >= 0 && (
          <CircleButton
            variant="text"
            text="HOME"
            clickHandler={() => routeClickHandler(router, "/")}
          />
        )}
        {categoryId > 0 && (
          <CircleButton
            variant="text"
            text="PREV"
            clickHandler={() =>
              routeClickHandler(
                router,
                categories[categoryId - 1]?.slug as string
              )
            }
          />
        )}
        {categoryId < categories.length - 1 && (
          <CircleButton
            variant="text"
            text="NEXT"
            clickHandler={() =>
              routeClickHandler(
                router,
                categories[categoryId + 1]?.slug as string
              )
            }
          />
        )}
        <CircleButton
          variant="icon"
          type="accessibility"
          clickHandler={() => onClickAccesssibilityHandler(!a11yMode)}
        />
        <Share type="circleButton" url={url} />
      </Wrapper>
    </ThemeContext>
  );
};

export default FloatingNav;
