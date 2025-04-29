const {test,expect} = require('@playwright/test');

test('UI controls', async({page})=>{
await page.goto("https://rahulshettyacademy.com/loginpagePractise");

const user = page.locator("[name='username']");
const pwd = page.locator("[name='password']");

await user.fill("rahulshettyacademy");
await pwd.fill("learning");

const drp = page.locator("select.form-control");

//selecting dropwdown
await drp.selectOption("teach"); //need to give option's value

//selecting radio button
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();

//to check is selected/not
await expect(await page.locator(".radiotextsty").last()).toBeChecked();

//or
console.log(await page.locator(".radiotextsty").last().isChecked()); // ischecked() used to give true or false, not an assertion.

//checkbox
await page.locator("#terms").check();  //click or check
await page.locator("#terms").uncheck(); //uncheck
//to verify its unchecked/not.
await expect(await page.locator("#terms").isChecked()).toBeFalsy(); //tobefalsy() - intentionally checking its to be false.(like 'assertFalse')
//await can be used for page actions 


//await page.pause(); //it opens playwright inspector and stops the execution
const link = page.locator(".blinkingText");
expect(await link.toBeVisible());
await expect(link.toHaveAttribute("class","blinkingText"));

await page.locator("[type='submit']").click();

});


test('child windows', async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise");

//const user = page.locator("[name='username']");
// const pwd = page.locator("[name='password']");

//await user.fill("rahulshettyacademy");
// await pwd.fill("learning");
// await page.locator("[type='submit']").click();

const doc_link = page.locator("[href*='doc']");


//original context to new page context
//waitforevent - triggered when new page is create,this method returns new page variable
// don't use await here - bcoz until that line completion we don't need to wait, it can work parallely.so we can leave it as async.
//3 status of promise = pending, rejected, fulfilled.

//we can parallely execute these 2 steps and we can wrap those text in an array using promise()-it ensures that when all the lines are executed fulffilled then only it will come out from promise array.
// it has to return fulfilled promises.
//it will iterate until its fulfilled.
//it returns newpage object.


const [newPage,newPage2] = await Promise.all(  //newPage2 if its open 2 page,it will be the 2nd page object.

[context.waitForEvent('page'),
doc_link.click(),

])

//newPage will be used for locating elemets in new page.
const text = await newPage.locator(".red").textContent();
console.log(text);
const arrText = text.split("@");
console.log(arrText[1]);
const domain = arrText[1].split(" ")[0];
console.log(domain);
page.locator("#username").fill(domain);
console.log(page.locator("#username").textContent());
await page.pause();
});



