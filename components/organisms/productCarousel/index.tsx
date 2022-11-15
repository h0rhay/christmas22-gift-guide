import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProductDetails } from "types";
import ProductCard from "components/molecules/productCard";
import FullWidthWrap from "components/ecosystem/fullWidthWrap";

const SLIDER_MOBILE = 576;
const SLIDER_TABLET = 1080;
const REM = 16;

const Pager = styled.div`
  height: 3px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
`;

/**
 * mobile behaviour: 1 card, scaled to it when card is active.
 * Partially visible left and right cards from the active one
 */
const StyledSlider = styled(Slider)`
  margin: ${({ theme }) => theme.typography.space.mediumGap} 0
    ${({ theme }) => theme.typography.space.small} 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;

  @media (max-width: ${SLIDER_MOBILE / REM}rem) {
    .slick-slide {
      transition: transform 0.5s ease-in-out;
      transform: scale(0.85);

      &.slick-current {
        transform: scale(1);
      }
    }
  }
  .slick-arrow.slick-prev,
  .slick-arrow.slick-next {
    display: none !important;
  }
  .slick-dots {
    bottom: -2.5rem;
    li div {
      opacity: 0.4;
      background-color: ${({ theme }) => theme.currentColorGroup.interface};
    }

    li.slick-active > div {
      opacity: 1;
      background-color: ${({ theme }) => theme.currentColorGroup.interface};
    }
  }
`;

type ProductCarouselType = {
  products: IProductDetails[];
  className?: string;
};

const ProductCarousel = ({ products, className }: ProductCarouselType) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    speed: 450,
    arrows: false,
    responsive: [
      {
        breakpoint: SLIDER_MOBILE,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: SLIDER_TABLET,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    customPaging: () => <Pager />,
  };
  if (products && products.length > 0) {
    // dont print more that 10 items
    if (products.length > 10) {
      products.length = 10;
    }
    return (
      <FullWidthWrap>
        <StyledSlider {...settings} className={className}>
          {products.map((product: IProductDetails, index: number) => {
            return (
              <ProductCard key={`${product.brand}${index}`} product={product} />
            );
          })}
        </StyledSlider>
      </FullWidthWrap>
    );
  }
  return <></>;
};

export default ProductCarousel;
