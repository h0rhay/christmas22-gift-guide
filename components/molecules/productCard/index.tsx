import Button from "components/atoms/button";
import styled from "styled-components";
import { IProductDetails } from "../../../types";
import Link from "next/link";
import ImageComponent from "components/atoms/imageComponent";
import { useContext } from "react";
import { AppContext } from "components/ecosystem/appContext";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";

const StyledProductCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.typography.space.small};
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.small} {
    padding: ${({ theme }) => theme.typography.space.extraSmall};
  }
`;

const ProductDetails = styled.div<{ a11yMode: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.typography.space.small};
  min-height: 9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.medium};
  text-overflow: ellipsis;
  overflow: hidden;

  .product-card-price {
    height: auto;
  }

  h4 ~ p {
    height: ${({ a11yMode }) => (a11yMode ? "4rem" : "3rem")};
    overflow: hidden;
    white-space: no-wrap;

    @supports (-webkit-line-clamp: 2) {
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  & p {
    font-size: ${({ theme, a11yMode }) =>
      a11yMode
        ? theme.typography.fontSize.large
        : theme.typography.fontSize.small};
  }
`;

const BrandName = styled.h4<{ a11yMode: boolean }>`
  all: unset;
  min-height: 3.5rem;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: ${({ theme }) => theme.typography.space.small} 0
    ${({ theme }) => theme.typography.space.extraSmall} 0;
  font-size: ${({ theme, a11yMode }) =>
    a11yMode
      ? theme.typography.headingFontSize.medium
      : theme.typography.headingFontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  @supports (-webkit-line-clamp: 2) {
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  width: 100%;

  ${({ theme }) => theme.breakpoints.large} {
    width: 60%;
  }
  & a {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

type ProductCardType = { product: IProductDetails };

const ProductCard = ({ product }: ProductCardType) => {
  const { imageLink, pdpLink, brand, productName, price } = product;
  const { categoryName, a11yMode } = useContext(AppContext);

  const onClickHandler = () => {
    new AnalyticsFactory({
      ga_eventaction: ClickEventActions.product,
      page_name: categoryName,
      ga_eventlabel: productName,
    }).trigger();
  };

  return (
    <StyledProductCard>
      <ImageComponent
        type={"product"}
        src={imageLink || ""}
        altText={`${brand} ${productName}` || ""}
      />
      <ProductDetails a11yMode={a11yMode}>
        <BrandName a11yMode={a11yMode}>{brand}</BrandName>
        <p>{productName}</p>
        <p className="product-card-price">£{price}</p>
      </ProductDetails>
      <ButtonContainer>
        <Button onClick={onClickHandler} type="button" variation="reverse">
          <Link href={pdpLink || "/"} passHref>
            <a target="_blank">Shop Now</a>
          </Link>
        </Button>
      </ButtonContainer>
    </StyledProductCard>
  );
};

export default ProductCard;
