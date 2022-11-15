import { render } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import ProductCard from "./";
import { IProductDetails } from "types";

const renderComponent = () => {
  const product = {
    brand: "Test Brand",
    productName: "Test Product Name",
    price: "£300",
    imageLink:
      "https://images.selfridges.com/is/image/selfridges/5120-10004-4438440879_M?PDP_M_ZOOM",
    pdpLink:
      "https://www.selfridges.com/GB/en/cat/burberry-furley-checked-sliders_5120-10004-4438440879",
  } as IProductDetails;

  return render(
    <ThemeProvider theme={Theme}>
      <ProductCard product={product} />
    </ThemeProvider>
  );
};

describe("ProductCard", () => {
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
