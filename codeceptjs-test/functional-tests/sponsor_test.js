Feature('Sponsor test');

Scenario('Validate if the sponsor block is visible', ({products, categories,sponsor}) => {
  products.showChristmasPage();
  categories.clickFirstCategory();
  sponsor.getSponsorDetails();
});