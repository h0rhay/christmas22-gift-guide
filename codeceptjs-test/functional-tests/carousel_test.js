Feature('Carousel test');

Scenario('Validate if Carousel block and its elements are visible', async({products,categories,carousel}) => {
  products.showChristmasPage();
  categories.clickFirstCategory();
  carousel.seeCarouselBlock();
});
Scenario('Validate if Carousel cards move right and then left', async({products,categories,carousel}) => {
  products.showChristmasPage();
  categories.clickFirstCategory();
  carousel.slideCarousel();
});

