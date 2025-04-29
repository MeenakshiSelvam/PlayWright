const {test} = require('@playwright/test');


test.only('Browser Fixture', async function({browser})
{

    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://playwright.dev/docs/codegen-intro");

});

test ('Page Fixture', async function({page})
{


    await page.goto("https://playwright.dev/docs/codegen-intro");

});















