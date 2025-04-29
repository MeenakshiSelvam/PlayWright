//login,choose one product, add to cart,expect-verify the same product added,checkout,verify,complete checkout,get id and verify its ordered,click history and search for id and click and verify the product is there.
const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");

const user = page.locator("#userEmail");
const pwd = page.locator("#userPassword");


//Login
await user.fill("sssmeena207@gmail.com");
await pwd.fill("Testing@123");
await page.locator("[type='submit']").click();

const itemName = await page.locator("div.card-body b").nth(2).textContent();
console.log(itemName);
 
//Choose product to add to cart.
await page.locator("[class = 'btn w-10 rounded']").nth(2).click();


//clicking add to cart and verifying the product
await page.locator("[routerlink*='/dashboard/cart']").click();
const itemNo = await page.locator(".itemNumber").textContent();
console.log(itemNo);
expect(await page.locator("div h3").last().textContent()).toEqual(itemName);

await page.locator("button").last().click();

console.log(await page.locator(".item__title").textContent());
console.log(await page.locator(".item__price").textContent());
console.log(await page.locator(".item__quantity").textContent());
console.log(await page.locator(".item__description").textContent());


//verify it shows same product name

const itemName2 = await page.locator(".item__title").textContent();
console.log(itemName2);
await expect(itemName2.trim()).toEqual(itemName);

//trim() only removes leading and trailing whitespace characters.(starting and ending spaces).



const user2 = await page.locator("div label[type='text']").textContent();

expect(user2).toEqual("sssmeena207@gmail.com");

//checkout
const country = page.locator("[placeholder*='Select Countr']");
// await page.fill("[placeholder*='Select Countr']", 'India');  // Replace the selector with the actual field selector


//"[placeholder^='Select']"      // starts with "Select"
//"[placeholder$='Country']"     // ends with "Country"

//await page.locator("[placeholder*='Select Countr']").fill('India');//enter country.
//await page.keyboard.press('Enter');
//

await page.pause();
await country.fill("India");
await country.press('Backspace');

// keyboard is a property of page, not of a locator:


// await country.hover();
// await page.waitForTimeout(500);
// await country.press('Enter');
await page.locator("button:nth-child(2) span:nth-child(1)").click();


//await page.waitForSelector() //for suggestion.

    
await page.locator("[name='coupon']").fill("rahulshettyacademy");//apply coupon
await page.locator("[type='submit']").click();


await page.locator("(//input[@type='text'])[2]").fill("123"); //cvv

await page.locator("select.input.ddl").last().selectOption("02"); //expiry yr
await page.locator("select.input.ddl").first().selectOption("02"); //expiry date

await page.locator("(//input[@type='text'])[3]").fill("Meena"); //name on coupon



await page.locator(".btnn.action__submit.ng-star-inserted").click(); //place order
//or
//

console.log(await page.locator("table td h1[class = 'hero-primary']").textContent());
const itemId = await page.locator("label.ng-star-inserted").textContent();

console.log(itemId);

await page.locator("table.order-summary tr:nth-child(4) button").click(); //dw file.
expect(await page.locator("text='IPHONE 13 PRO'").last().textContent()).toEqual(itemName);
await page.locator("label[routerlink='/dashboard/myorders']").click();




const newItemId=itemId.replace(/[| ]/g, ''); // Removes all pipes and spaces
console.log(newItemId);

//
///[| ]/g: a regular expression
//
//[...]: a character set — matches either | or a space
//
//g: global flag — means "replace all matches," not just the first one
//
//'': replaces the matched characters with nothing (i.e., deletes them)

expect(await page.locator("tr:nth-child(1) th:nth-child(1)[scope='row']")).toHaveText(newItemId);




});






