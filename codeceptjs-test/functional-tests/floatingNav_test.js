Feature('Floating Nav test');

Scenario('Validate if clicking on Next opens the next category', ({products, floatingNav}) => {
  products.showChristmasPage();
  floatingNav.clickNext();
});
Scenario('Validate if clicking on prev opens the previous category', ({products, floatingNav}) => {
  products.showChristmasPage();
  floatingNav.clickNext();
  floatingNav.clickNext();
  floatingNav.clickPrev();
});
Scenario('Validate if clicking on home opens the home category', ({products, floatingNav}) => {
  products.showChristmasPage();
  floatingNav.clickHome();
});
Scenario('Validate if clicking on share opens the share category', ({products, floatingNav}) => {
  products.showChristmasPage();
  floatingNav.clickNext();
  floatingNav.clickShare();
});