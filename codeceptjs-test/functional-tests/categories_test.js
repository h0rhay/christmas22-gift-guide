Feature('Categories test');

Scenario('Validate if clicking first category opens the category page', ({products, floatingNav, categories}) => {
  products.showChristmasPage();
  categories.clickFirstCategory();
});
Scenario('Validate if clicking last category opens the category page',({products,categories}) => {
  products.showChristmasPage();
  categories.clickLastCategory();
});
Scenario('Validate if clicking any category opens the category page',({products,categories}) => {
  products.showChristmasPage();
  categories.clickAnyCategory();
});