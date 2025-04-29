// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
 

  /* Opt out of parallel tests on CI. */
  // workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

  //  //screenshot is for capturing an image of the browser's state, while trace provides a full, rich log of the test's execution.
  //    trace: 'on',  
  //    browserName: 'webkit',
  //    headless: true,
  //    screenshot : 'on',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name : 'safari',

      use: {

         trace: 'on',  
         browserName: 'webkit',
         headless: false,
         screenshot : 'on',
         ...devices['iPhone 11 Pro']
       
    
      },
    },
    
//     {
//       name : 'chrome',
      
//       use: {

//          trace: 'on',  
//          browserName: 'chromium',
//          headless: false,

//         //record video
//         video:'retain-on-failure',

//          //ss
//          screenshot : 'on',

//          //ignore ssl certification error - connection is not private error (it will bypass).

//         ignoreHTTPSErrors :true,

// //giving permission  -- allow location automatically.
//         permissions:['geolocation'],




//viewing browser
        //  viewport:{width:720,height:720},
        //  ...devices['iPhone 11 Pro']
    
    //   },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

