const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/angularpractice/");

//getbyLabel - we can use for clicking, but not mostly used for input box(its works occasionally).
await page.waitForLoadState("networkidle");

await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Student").click();
//await page.getByRole("Gender").selectOption("Female"); 
await page.getByPlaceholder("Password").fill("Testing@123");
//await page.getAttribute("email").fill("sssmeena207@gmail.com");

//even if its button tag or button class we can give button in role
//it filters all button, to filter {}we can give the name (here - we r giving value as name)
await page.getByRole("button",{name: 'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!").isVisible();
await page.getByRole("link", {name: 'Shop'}).click(); // here we r giving text as name. whatever we are seeing button name in UI, thats a name.


await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); //it acts as getbytext in the app card tags.

await page.pause(); 




});
