const I = actor();
const videoContainer = locate('[data-test-id=video-container]');
const posterImage = locate('[data-test-id=video-poster-img]');
const playButton = locate('[data-test-id=play-video]');


module.exports = {
  async getVideoDetails() {
    I.amOnPage('/party-wear');
    I.scrollTo(videoContainer);
    I.wait(5);
    I.seeElement(posterImage);
    I.seeElement(playButton);
    I.wait(5);
  },

  async clickPlay() {
    I.click(playButton);
    I.wait(15);
    I.dontSeeElement(playButton);
    I.dontSeeElement(posterImage);
  }

};
