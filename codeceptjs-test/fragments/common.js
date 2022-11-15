const { defaultWaitingTime } = require("../support/shared.constants");
const I = actor();

module.exports = {
  clickBackBrowser() {
    I.executeScript(() => window.history.back());
    I.wait(10);
  },

  getCurrUrl() {
    var url = I.executeScript(() => window.location.href());
    I.wait(10);
    return url;
  },
  clickReload() {
    var url = I.executeScript(() => window.location.reload());
    I.wait(10);
  },

  loseFocus(fieldName) {
    I.click(".form-items");
  },
};
