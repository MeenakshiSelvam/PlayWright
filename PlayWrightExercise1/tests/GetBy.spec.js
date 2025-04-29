const {test,expect} = require('@playwright/test');


// re-writing with getby method.
test.only('testcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/client/auth/login");

await page.getByPlaceholder("email@example.com").fill("sssmeena207@gmail.com");;
await page.getByPlaceholder("enter your passsword").fill("Testing@123");
await page.getByRole("button").click();


const productName='ZARA COAT 3';



//add to cart
await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button",{name: 'Add To Cart'}).click(); /// name - text of button.

// to click cart on above page, use parent tag and filter it,bcoz it returns all cart button.
await page.getByRole('listitem' ).getByRole("button",{name: 'Cart'}).click();

//or we can also use locator like this instead of above getBy
//
//const card = page.locator('.product-card')
//  .filter({ hasText: 'iPhone' })
//  .locator('button', { hasText: 'Buy Now' });

//filter can be used after locator.



//to check 'product name' is present
await page.locator("div li").first().waitFor(2000);
await expect(page.getByText("ZARA COAT 3")).toBeVisible();


//checkout
await page.getByRole("button",{name: 'Checkout'}).click();

//enter country and click suggestion
await page.getByPlaceholder("Select Country").pressSequentially('Ind');
await page.getByRole("button",{name: 'India'}).nth(1).click(); 

//place order (here we use text bcoz place order button is in link tag with button class)
await page.getByText("Place Order ").click();

await page.waitForLoadState('networkidle');
//checking text is visible.
await expect( page.getByText(" Thankyou for the order. ")).toBeVisible();

//getting id
const id = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();


console.log(id);



//clicking orders

await page.getByRole("button",{name: '  ORDERS'}).click();

await page.locator("tbody").waitFor();

//checking order id is visible
const ItemId = await page.locator("tbody tr th").nth(0).textContent();
console.log(ItemId);
await expect(id).toContain(ItemId);

});

//page.waitForSelector() → to wait for elements
//
//  page.waitForTimeout() → to pause for X ms
//
//  page.waitForFunction() → to wait for custom logic