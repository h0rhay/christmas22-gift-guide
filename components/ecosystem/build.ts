import type {
  IStock,
  IProductDescription,
  IPrice,
  IProductDetails,
  CarouselDataType,
  CarouselsProductsTypes,
} from "types";

const headers = new Headers({
  "Api-Key": process.env.API_KEY || "",
});

const getStock = async (productId: string): Promise<boolean> => {
  console.log({
    level: "info",
    context: "build:getStock:init",
    body: {
      product: productId,
    },
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/stock/byId/${productId}`,
      {
        method: "get",
        headers,
      }
    );
    const { stocks } = await response.json();
    let inStock = false;
    stocks?.forEach((stock: IStock) => {
      if (Number(stock["Stock Quantity Available to Purchase"]) > 0) {
        inStock = true;
      }
    });
    inStock
      ? console.log({
          level: "info",
          context: "build:getStock:success",
          body: {
            product: productId,
            msg: "In stock",
          },
        })
      : console.log({
          level: "error",
          context: "build:getStock:error",
          body: {
            product: productId,
            error: "Out of stock",
          },
        });
    return inStock;
  } catch (error) {
    console.log({
      level: "error",
      context: "build:getStock:error",
      body: {
        product: productId,
        error,
      },
    });
    return false;
  }
};

const getProductDescription = async (
  productId: string
): Promise<IProductDescription> => {
  console.log({
    level: "info",
    context: "build:getProductDescription:init",
    body: {
      product: productId,
    },
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/productview/${productId}`,
      {
        method: "get",
        headers,
      }
    );
    const { productDetails } = await response.json();
    console.log({
      level: "info",
      context: "build:getProductDescription:success",
      body: {
        product: productId,
        msg: "Fetched product description",
      },
    });
    return {
      id: productId,
      pdpLink: `${process.env.NEXT_PUBLIC_PDP_BASE_URL}/${productDetails[0].seoKey}/`,
      imageLink: `https://images.selfridges.com/is/image/selfridges/${productId}_M?&scl=3&qlt=80`,
      brand: productDetails[0].CatalogEntryView[0].BrandName,
      productName:
        productDetails[0].CatalogEntryView[0].ShortProductDescription,
    };
  } catch (error) {
    console.log({
      level: "error",
      context: "build:getProductDescription:error",
      body: {
        product: productId,
        error,
      },
    });
    return { id: productId, brand: false };
  }
};

const getPrice = async (productId: string): Promise<IPrice> => {
  console.log({
    level: "info",
    context: "build:getPrice:init",
    body: {
      product: productId,
    },
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/price/byId/${productId}`,
      {
        method: "get",
        headers,
      }
    );
    const { prices } = await response.json();
    console.log({
      level: "info",
      context: "build:getPrice:success",
      body: {
        product: productId,
        msg: "Fetched product price",
      },
    });

    return { price: prices[0]["Current Retail Price"] };
  } catch (error) {
    console.log({
      level: "error",
      context: "build:getPrice:error",
      body: {
        product: productId,
        error,
      },
    });
    return { price: false };
  }
};

const getProductDetails = async (
  productId: string
): Promise<IProductDetails> => {
  try {
    const inStock = await getStock(productId);
    let product, price;
    if (inStock) {
      product = await getProductDescription(productId);
      price = await getPrice(productId);
    } else {
      product = { brand: false };
      price = { price: false };
    }
    return { ...product, ...price };
  } catch (error) {
    console.log("build:getProductDetails:error", error);
    return { brand: false, price: false };
  }
};

const build = async (
  carouselDataset: CarouselDataType | undefined
): Promise<CarouselsProductsTypes> => {
  let result: any = {};
  if (carouselDataset) {
    const topCarouselIds = carouselDataset.top;
    if (topCarouselIds) {
      const topCarouselItems = await getDataByPosition(topCarouselIds);
      if (topCarouselItems)
        result["top"] = topCarouselItems.filter((el) => el.brand && el.price);
    }
    const bottomCarouselIds = carouselDataset.bottom;
    if (bottomCarouselIds) {
      const bottomCarouselItems = await getDataByPosition(
        carouselDataset.bottom
      );
      if (bottomCarouselItems)
        result["bottom"] = bottomCarouselItems.filter(
          (el) => el.brand && el.price
        );
    }
  }
  return result;
};

export default build;

const getDataByPosition = async (
  dataset: string[] | undefined
): Promise<IProductDetails[] | undefined> => {
  if (dataset) {
    const items = dataset.map((productId: string) =>
      getProductDetails(productId)
    );
    return await Promise.all(items);
  } else {
    return [];
  }
};
