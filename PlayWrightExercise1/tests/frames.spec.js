const {test,expect} = require('@playwright/test'); // we are importing @playwright/test from that, we are importing test and expect stuff as const to ensure it can't be re-assigned in code.


test('Api integration', async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.pause();



});
