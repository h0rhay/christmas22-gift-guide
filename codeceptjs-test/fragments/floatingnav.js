const { defaultWaitingTime } = require("../support/shared.constants");
const I = actor();

module.exports = {
  clickHome() {
    I.amOnPage("/kids-gifts");
    I.click(locate("[data-test-id=floatingNav] button").withText("HOME"));
    I.wait(10);
  },
  clickPrev() {
    I.wait(5);
    I.click(locate("[data-test-id=floatingNav] button").withText("PREV"));
    I.wait(10);
  },
  clickNext() {
    I.click(locate("[data-test-id=floatingNav] button").withText("NEXT"));
    I.wait(10);
  },
  clickAccessibility() {
    I.click(locate("[data-test-id=floatingNav] button").at(3));
  },
  clickShare() {
    I.click(locate("[data-test-id=floatingNav] button").last());
    I.wait(defaultWaitingTime);
  },
};
