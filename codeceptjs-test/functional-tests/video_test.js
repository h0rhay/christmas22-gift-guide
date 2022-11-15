Feature('Video test');

Scenario('Validate video play button functionality',({products, categories, video})=> {
    products.showChristmasPage();
    video.getVideoDetails();
    video.clickPlay();
} )

