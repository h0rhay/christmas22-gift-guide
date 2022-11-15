import { ReactNode, useEffect, useContext, useRef } from "react";
import { AppContext } from "components/ecosystem/appContext";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";
import { routeClickHandler } from "components/ecosystem/routeClickHandler";
import AccordionHeader from "./accordionHeader";
import Title from "components/atoms/title/title";
import Subtitle from "components/atoms/subtitle/subtitle";
import SiteWidthWrapper from "components/atoms/siteWidthWrapper";
import ImageComponent from "components/atoms/imageComponent";
import { scrollIntoView } from "seamless-scroll-polyfill";


type IAccordion = {
  id: number;
  slug: string;
  title: string;
  type: string;
  tasteMaker: string;
  hoverImage?: string;
  expanded?: number;
  children: ReactNode;
  isOdd: boolean;
};

const StyledAccordion = styled.article<{ isOpen: boolean; isOdd: boolean }>`
  position: relative;
  transition: all 0.5s ease-in-out;
  margin-top: -${({ theme }) => theme.typography.space.extraSmallGap};
  padding-bottom: ${({ theme }) => theme.typography.space.extraSmallGap};

  header {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    text-transform: capitalize;

    .author-image {
      display: none;
      transition: opacity 1.2s;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;

      .image-component__container {
        width: 19rem;
        margin-top: -1.2rem;
      }
    }

    ${({ theme, isOdd, isOpen }) => css`
      padding-top: ${theme.typography.space.small};

      ${!isOpen && "cursor: pointer;"}

      ${theme.breakpoints.large} {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: ${theme.typography.space.mediumGap} ${theme.typography.space.small
    } 0 ${theme.typography.space.small};
        margin:0 0 ${theme.typography.space.smallGap} -${theme.typography.space.small
    };
        right: 0;

        .author-image {
          display: block;
        }
      }

      .accordion-title {
        font-family ${theme.typography.fontFamily.formula};
        font-weight: ${theme.typography.fontWeight.bold};
        margin-right: ${theme.typography.space.large};

        ${!isOdd &&
    `
          font-family: ${theme.typography.fontFamily.apoc};
          font-weight: ${theme.typography.fontWeight.light};
          margin-bottom: 0.2rem;
        `
    }
      }
      .accordion-a11y-title {
        font-size: ${theme.typography.fontSize.xlarge};
        font-family: ${theme.typography.fontFamily.default};
        font-weight: ${theme.typography.fontWeight.bold};
        margin-right: ${theme.typography.space.large};
      }
    `}
  }

  .accordion-bottom-space {
    padding: 1rem;
  }

  ${({ theme, isOpen }) => css`
    padding-bottom: calc(1.5 * ${theme.typography.space.large});

    ${!isOpen &&
    css`
      cursor: pointer;
      :hover {
        padding-bottom: calc(2 * ${theme.typography.space.large});

        ${theme.breakpoints.large} {
          padding-bottom: calc(2.7 * ${theme.typography.space.large});
          margin-bottom: ${theme.typography.space.small};

          .author-image {
            opacity: 1;
          }
        }
      }
    `}

    ${isOpen &&
    css`
      padding-bottom: calc(3 * ${theme.typography.space.large});

      header {
        margin-top: ${theme.typography.space.medium};
      }

      .accordion-subtitle {
        ${theme.breakpoints.small} {
          margin-bottom: ${theme.typography.space.medium};
        }
      }
    `}
  `}
`;

const Accordion = ({
  id,
  slug,
  title,
  type,
  tasteMaker,
  hoverImage,
  expanded,
  isOdd,
  children,
}: IAccordion) => {
  const router = useRouter();
  const reference = useRef<HTMLElement>(null);
  const { routeChanging, setRouteChanging, a11yMode } = useContext(AppContext);
  const isOpen = id === expanded;

  useEffect(() => {
    if (isOpen && reference && "current" in reference && reference.current) {
      scrollIntoView(reference.current, { behavior: "smooth", block: "start" });
    }
    router.events.on("routeChangeComplete", () => {
      setRouteChanging(false);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setRouteChanging(false);
      });
    };
  }, [expanded, routeChanging, router.events, setRouteChanging, isOpen]);
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions

  const onAccordionClickHandler = () => {
    if (!isOpen) setRouteChanging(true);
    routeClickHandler(router, slug);
  };

  return (
    <StyledAccordion
      className="xmas-styled-accordion"
      isOpen={isOpen}
      isOdd={isOdd}
      ref={reference}
    >
      <SiteWidthWrapper>
        <motion.header
          onClick={isOpen ? undefined : onAccordionClickHandler}
          animate={{ transition: { duration: 0.001 } }}
        >
          <AccordionHeader title={type} />
          <Title
            isCenter={false}
            size={isOpen ? "large" : "medium"}
            className={a11yMode ? "accordion-a11y-title" : "accordion-title"}
          >
            {title}
          </Title>
          {hoverImage && <div className="author-image">
            <ImageComponent
              type="author"
              src={hoverImage}
              altText={title}
              className="image-component__author"
            />
          </div>}
          <Subtitle
            text={tasteMaker}
            isCenter={false}
            className="accordion-subtitle"
          />
        </motion.header>
        <AnimatePresence>
          {isOpen && (
            <AnimatePresence>
              {!routeChanging && (
                <motion.section
                  key={`content-inner-${id}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: {
                      opacity: 0,
                      height: 0,
                      transition: { duration: 0.1 },
                    },
                  }}
                  transition={{ duration: 1.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {children}
                </motion.section>
              )}
            </AnimatePresence>
          )}
        </AnimatePresence>
        <div className="accordion-bottom-space" />
      </SiteWidthWrapper>
    </StyledAccordion>
  );
};

type ICategory = {
  slug: string;
  id: number;
  title: string;
  type: string;
  tasteMaker: string;
  hoverImage?: string;
  theme: string;
};
type IAccordionComponent = {
  selectedCategoryId?: number;
  categories: Array<ICategory>;
  children: ReactNode;
};

const AccordionComponent = ({
  selectedCategoryId,
  categories,
  children,
}: IAccordionComponent) => {
  const { a11yMode } = useContext(AppContext);
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const theme = (id: number, theme: string): string => {
    if (a11yMode) {
      if (id % 2 === 0) {
        return "light";
      } else {
        return "dark";
      }
    } else {
      return theme;
    }
  };
  return (
    <>
      {categories.map((category, categoryIndex) => (
        <ThemeContext
          colorGroup={theme(category.id, category.theme)}
          key={category.id}
        >
          <Accordion
            slug={category.slug}
            id={category.id}
            type={category.type}
            tasteMaker={category.tasteMaker}
            hoverImage={category.hoverImage}
            title={category.title}
            expanded={selectedCategoryId}
            isOdd={categoryIndex % 2 !== 0}
          >
            {children}
          </Accordion>
        </ThemeContext>
      ))}
    </>
  );
};

export default AccordionComponent;
