Feature('Product test');

Scenario('Validate if Products page opens', ({products}) => {
  products.showChristmasPage();
});
Scenario('Validate if the Product card is all fields visible', ({products, categories}) => {
  products.showChristmasPage();
  categories.clickFirstCategory();
  products.getProductDetails();
});