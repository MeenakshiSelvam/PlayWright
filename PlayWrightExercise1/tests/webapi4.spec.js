//executing test scripts by saving session details in 1st login thro UI and using it for all test scripts so we can skip login.


const {test,expect} = require('@playwright/test');
let webContext;
test.beforeAll(async({browser})=>
{


    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    
    await email.fill("sssmeena207@gmail.com");
    await pwd.fill("Testing@123");
    const login = page.locator("#login");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'}); //storage state will store all the session details in the state.json file(file will be created).
    webContext = await browser.newContext({storageState:'state.json'}); //injecting details to new browser.
   
}
);


test('login by saved session storage', async( )=>{ //we can remove page fixture, bcoz we are using page dynamically.

const page =  await webContext.newPage(); // new page with session details.
await page.goto("https://rahulshettyacademy.com/client");

const productName='ZARA COAT 3';
await page.waitForLoadState('networkidle');
const products= await page.locator(".card-body");
const count = await products.count();
console.log(count);

await page.waitForLoadState('networkidle');

const titles= await page.locator(".card-body b").allTextContents();
console.log(titles);
// to get all products name

//to check and get one specific product

await page.waitForLoadState('networkidle');
await page.pause();

for (let i=0; i<count; i++) {
   
    await page.pause();

    if(await products.nth(i).locator("b").textContent() === productName)
    {

        await page.pause();

        //add to cart   
        
        await products.nth(i).locator("i.fa.fa-shopping-cart").click();
       
        break;
    }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); 

    await page.locator("[type='button']").last().click(); //checkout
    await page.locator("[placeholder*='Country']").pressSequentially("Ind"); 
    const dropdown = await page.locator("section.ta-results.list-group.ng-star-inserted");
    await dropdown.waitFor();
    const optcount = await dropdown.locator("button").count();    

    for (let i=0; i<optcount; i++)
    {
        const value = (await dropdown.locator("button").nth(i).textContent())?.trim() || ''; 
       
        if(value === "India"){

        await dropdown.locator("button").nth(i).click();
        break;

    }}


await page.locator("[routerlink*='orders']").first().click();





});
