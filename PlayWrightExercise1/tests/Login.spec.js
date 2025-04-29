const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/loginpagePractise");
// await page.pause();
const user = page.locator("[name='username']");
const pwd = page.locator("[name='password']");
await user.fill("123");
await user.fill(" "); // clear the content
await user.fill("rahulshettyacademy");
await pwd.fill("learning");
await page.locator("[type='submit']").click();



});



    