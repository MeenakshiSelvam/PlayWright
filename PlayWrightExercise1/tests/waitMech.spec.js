const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/loginpagePractise");

const user = page.locator("[name='username']");
const pwd = page.locator("[name='password']");
await user.fill("123");
await user.fill(" "); // clear the content
await user.fill("rahulshettyacademy");
await pwd.fill("learning");
await page.locator("[type='submit']").click();
// console.log(await page.locator(".card-body a").nth(0).textContent()); // without this line, below line won't find all text
console.log(await page.locator(".card-body a").allTextContents());  // this will return 0 or any, bcoz playw won't wait until all text comes.


});

test('logging in',async ({page})=>{

    await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");
    
    const log_email = page.locator("#userEmail");
    const log_pwd = page.locator("#userPassword");
    const login = page.locator("#login");
    
    await log_email.fill("sssmeena207@gmail.com");
    await log_pwd.fill("Testing@123");
    await login.click();


    await page.waitForLoadState('networkidle'); // it waits until all network calls are made. //to wait dynamically we can use this.
    const first_product = page.locator(".card-body b");

    // or
    //await first_product.waitFor(); // it waits until this elements found but it works only for unique element.so we can use first or last or nth to sepcify which element.
 

   
    console.log(await first_product.allTextContents());
    }); 

0.


































