const common = require("../fragments/common");

const { I, carousel, categories, floatingNav, sponsor, products, video } =
  inject();

Given("I navigate to Christmas home page", () => {
  products.showChristmasPage();
});
When("I open a category", async () => {
  categories.clickAnyCategory();
});
When("I open first category", () => {
  categories.clickFirstCategory();
});
When("I click the CTA in a chapter", () => {
  categories.clickCta();
});
When("I play video", async () => {
  video.getVideoDetails();
  video.clickPlay();
});
When("I click on a product card", async () => {
  products.getProductDetails();
});
When("I click the CTA on sponsor spot", () => {
  sponsor.getSponsorDetails();
});
When("I swipe on a carousel", () => {
  carousel.seeCarouselBlock();
  carousel.slideCarousel();
});
When("click on a CTA to be taken to the relevant PDP page", () => {
  carousel.clickShopNow();
});
When("I click on Home button", () => {
  floatingNav.clickHome();
});
When("I click on Next button", () => {
  floatingNav.clickNext();
});
When("I click on prev button", () => {
  floatingNav.clickNext();
  floatingNav.clickPrev();
});
When("I click on accessibility button", () => {
  floatingNav.clickAccessibility();
});
When("I click on Share button", () => {
  floatingNav.clickShare();
});
/*Then('I am directed to the relevant product page', async () =>{
  products.verifyProductpdpDetails();
});
/*Then('I should navigate to appropriate Selfridges page', async () =>{
  await categories.verifyProductPage();
});*/
