// require('ts-node/register');

const baseUrl =
  process.env.profile === 'undefined'
    ? 'http://localhost:3000'
    : process.env.profile;

const chromeArgs = ['--disable-web-security'];
//Incase we are containerising this below piece of code will be useful
//if (process.env.CODECEPT_IS_DOCKER_ENV === 'true') {
 // chromeArgs.push("--headless", "--disable-gpu", "--no-sandbox" );
//}

exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: baseUrl,
      show: false,
      windowSize: '1200x900',
      //keep the restart flag true, else mock tests will fail
      restart: false,
      chrome: {
        args: chromeArgs,
      },

    },
    "Mochawesome": {
      "uniqueScreenshotNames": "true"
  }
  },
  include: {
    I: './steps_file.js',
    products: './fragments/products.js',
    common: './fragments/common.js',
    categories: './fragments/categories.js',
    floatingNav: './fragments/floatingnav.js',
    sponsor: './fragments/sponsor.js',
    carousel:'./fragments/carousel.js',
    video: './fragments/video.js',
  },
  mocha: {
    reporterOptions: {
      reportDir: './codeceptjs-test/output',
    },
  },
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './integration-tests/*.feature',
    steps: ['./step_definitions/integration-steps.js'],
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    {
      pattern: 'wait.*',
      timeout: 0,
    },
    {
      pattern: 'amOnPage',
      timeout: 0,
    },
  ],
  tests: './functional-tests/*_test.js',
  name: 'codeceptjs-test',
  require: ["ts-node/register"]
};
