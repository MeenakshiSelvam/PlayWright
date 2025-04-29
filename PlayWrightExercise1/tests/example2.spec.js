const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await page.locator("[name='username']").fill("Admin");
await page.locator("[name='password']").fill("admin123");
await page.locator("//button[normalize-space()='Login']").click();
});

test.only('testcase2', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await page.locator("[name='username']").fill("Admin");
    await page.locator("[name='password']").fill("admin123");
    await page.locator("[type='submit']").click();
    console.log(await page.locator("[style*='none']").textContent());
    expect(page.locator("[style*='none']")).toContainText("incorrect");

    });

// Let - can be reassigned but not re declared

//Const - can't be re assigned and redeclared but can change properties in object or array but not as a whole.

//Var - can be reassigned and re declared - function scope.



