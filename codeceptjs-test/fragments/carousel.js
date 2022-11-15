const { Page } = require("puppeteer");
const { defaultWaitingTime } = require("../support/shared.constants");
const I = actor();
const shopNowButton = locate(".slick-current button");
module.exports = {
  async seeCarouselBlock() {
    I.amOnPage("/kids-gifts");
    I.wait(10);
    I.scrollTo(".slick-slider .slick-current");
    I.seeElement(".slick-slider .slick-current");
    I.wait(5);
    let brandName = await I.grabHTMLFrom(".slick-slider .slick-current h4");
    I.waitForElement(".slick-slide", 10);
    I.wait(5);
    let count = await I.grabNumberOfVisibleElements('.slick-slide');
    if (count > 4){
    //check if the dots are visible
      I.seeElement(".slick-dots");
    }
  },
  async slideCarousel() {
    I.scrollTo(".slick-slider .slick-current");
    I.seeElement(".slick-slider .slick-current");
    let count = await I.grabNumberOfVisibleElements('.slick-slide');
    if (count > 4){
      I.dragSlider(".slick-slider", -300);
      I.wait(5);
      //slide the carousel to left
      I.dragSlider(".slick-slider", 300);
    }
  },
  clickShopNow() {
    I.wait(10);
    I.seeElement(shopNowButton);
    I.click(shopNowButton);
  },
};
