const { defaultWaitingTime } = require("../support/shared.constants");
const I = actor();
const cta = locate("[data-test-id=sponsor]");

module.exports = {
  async getSponsorDetails() {
    I.wait(10);
    I.scrollTo(
      "div.colored-surface .site_width_wrapper section div [type=sponsor]"
    );
    let sponsorTitle = await I.grabHTMLFrom(
      "div.colored-surface  .site_width_wrapper section div [type=sponsor] h1.content-spot__title"
    );
    I.addMochawesomeContext("The sponsor title is", sponsorTitle);
    //check if a valid image present
    I.seeElement(
      "div.colored-surface .site_width_wrapper section div [type=sponsor] .image-component__container img"
    );
    //change the below to click once a valid URL is given
    I.seeElement(
      "div.colored-surface  .site_width_wrapper section div [type=sponsor] .content-spot__content-container button"
    );
    I.click(cta);
  },
};
