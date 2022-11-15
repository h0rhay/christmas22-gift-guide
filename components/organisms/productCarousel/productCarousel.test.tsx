import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import { IProductDetails } from "types";
import productsForTest from "./testingMocks";
import ProductCarousel from ".";

let container: HTMLElement;
let products: IProductDetails[];

let slides: NodeListOf<Element>;
let firstSlide: Element;
let dotsProgressBar: Element;

const loadElements = (container: HTMLElement): void => {
  slides = container.querySelectorAll(".slick-slide");
  firstSlide = container.querySelectorAll(".slick-slide")[0] as Element;

  dotsProgressBar = container.querySelectorAll(
    ".slick-dots li div"
  )[0] as Element;
};

const renderComponent = (products: IProductDetails[] | undefined) => {
  return render(
    <ThemeProvider theme={Theme}>
      {products && <ProductCarousel products={products} />}
    </ThemeProvider>
  );
};

let interfaceColour = Theme.currentColorGroup.interface;
describe(`Check arrows and dots color`, () => {
  beforeEach(() => {
    products = [...productsForTest];
    ({ container } = renderComponent(products));
    loadElements(container);
  });
  it("Colors are from chosen theme", () => {
    expect(dotsProgressBar).toHaveStyle(
      `background-color:  ${interfaceColour}`
    );
  });
});

describe("Carousel", () => {
  it("should match snapshot", () => {
    ({ container } = renderComponent(products));
    expect(container).toMatchSnapshot();
  });
  it("should match snapshot: will return nothing as the dataset doesn't have enough info (price or brand)", () => {
    ({ container } = renderComponent(products));
    expect(container).toMatchSnapshot();
  });
  it("should match snapshot: will return nothing as the dataset doesn't have enough info", () => {
    ({ container } = renderComponent(products));
    expect(container).toMatchSnapshot();
  });
});

describe("Carousel with no products", () => {
  beforeEach(() => {
    products = [];
    ({ container } = renderComponent(products));
    loadElements(container);
  });
  it("Don't print carousel at all", () => {
    expect(firstSlide).toBeUndefined();
  });
});

describe("Carousel with amount of slides less or equal to 4 and greaten than 0", () => {
  beforeEach(() => {
    products = [...productsForTest];
    products.length = 3;
    ({ container } = renderComponent(products));
    loadElements(container);
  });

  it("Slides loaded: 3 as products", () => {
    expect(slides.length).toBe(products.length);
  });
});

describe(`Carousel with slides amount greaten than 4 `, () => {
  beforeEach(() => {
    products = [...productsForTest];
    ({ container } = renderComponent(products));
    loadElements(container);
  });
  it("Print carousel at all", () => {
    expect(slides).toBeDefined();
  });
});
