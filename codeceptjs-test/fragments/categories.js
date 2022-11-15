const { Page } = require("puppeteer");
const { defaultWaitingTime } = require("../support/shared.constants");
const randomCatNum = Math.floor(Math.random() * 10) + 1;
let prodUrl;

const I = actor();
module.exports = {
  async clickFirstCategory() {
    I.scrollTo("div.colored-surface  .accordion-header__title");
    I.seeElement("div.colored-surface  .accordion-header__title");
    I.click(locate("div.colored-surface  .accordion-header__title"));
    I.wait(10);
    let currentUrl = await I.grabCurrentUrl();
    //TODO assert in the next hunk
    let title = await I.grabTextFromAll(".accordion-header__title");
    // I.seeInCurrentUrl(title);
  },
  async clickAnyCategory() {
    const numOfElements = I.grabNumberOfVisibleElements(
      "h4.accordion-header__title"
    );
    const random = Math.floor(Math.random() * numOfElements + 1);
    I.click(locate(".accordion-header__title").at(2));
    I.wait(10);
  },
  async clickLastCategory() {
    let numberofVisibleCategories = await I.grabNumberOfVisibleElements(
      "div.colored-surface  .accordion-header__title"
    );
    I.click(
      locate("div.colored-surface  .accordion-header__title").at(
        numberofVisibleCategories
      )
    );
    I.wait(10);
  },

  async clickCta() {
    I.seeElement("div.colored-surface  .accordion-header__title");
    I.click(locate("div.colored-surface  .accordion-header__title"));
    I.wait(10);
    I.seeElement(".xmas-styled-accordion button");
    I.wait(7);
    prodUrl = await I.grabAttributeFrom("[data-test-id=ghost] a", "href");
    I.scrollTo(".xmas-styled-accordion button a");
    I.click(locate(".xmas-styled-accordion button"));
    I.wait(10);
  },
  async verifyProductPage() {
    const tabs = await I.grabNumberOfOpenTabs();
    I.wait(10);
    I.switchToNextTab();
    const currUrl = await I.grabCurrentUrl();
    I.seeTextEquals(prodUrl, currUrl);
  },
};
