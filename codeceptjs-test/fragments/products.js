const { defaultWaitingTime } = require("../support/shared.constants");
const I = actor();
let currUrl;
let elm;
module.exports = {
  showChristmasPage() {
    I.amOnPage("/");
  },
  async getProductDetails() {
    I.amOnPage("/kids-gifts");
    I.scrollTo(".slick-current");
    I.seeElement(".slick-current img");
    //Fix the assert below in the furture commits
    elm = await I.grabAttributeFrom(".slick-current button a", "href");
    I.click(locate(".slick-current button a"));
  },
  async verifyProductpdpDetails() {
    I.wait(10);
    I.switchToNextTab();
    currUrl = await I.grabCurrentUrl();
    I.seeTextEquals(elm, currUrl);
  },
};
