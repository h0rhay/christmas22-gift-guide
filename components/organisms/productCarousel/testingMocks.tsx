import { IProductDetails } from "types";

const normalProduct = {
  pdpLink: "/",
  imageLink:
    "https://images.selfridges.com/is/image/selfridges/R03957988_WHITEBROWN1_ALT02?$PDP_M_ZOOM$",
  brand: "Fakiaga",
  productName:
    "Dress for dressing. Dress for dressing. Dress for dressing. Dress for dressing",
  price: "212",
  altText: "altText",
};

const emptyPriceProduct = { ...normalProduct, price: "" };
const emptyBrandProduct = { ...normalProduct, brand: "" };

const productsForTest: IProductDetails[] = [
  normalProduct,
  emptyBrandProduct,
  emptyPriceProduct,
  normalProduct,
  emptyPriceProduct,
  emptyBrandProduct,
];

export default productsForTest;
