const {test,expect} = require('@playwright/test');

test('Registration', async({page})=>{

const first_name = page.locator("#firstName");

const last_name = page.locator("#lastName");

const email = page.locator("#userEmail");

const ph_no = page.locator("#userMobile");

const occ = page.locator(".custom-select.ng-untouched.ng-pristine.ng-valid");

const gender = page.locator("input[value='Female']");

const pwd = page.locator("#userPassword");

const confirm_pwd = page.locator("#confirmPassword");

const check_box = page.locator(".ng-invalid.ng-dirty.ng-touched");

const reg = page.locator("#login");


await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");

await page.locator(".text-reset").click();

await first_name.fill("Meenakshi");
await last_name.fill("Selvam");
await email.fill("sssmeena207@gmail.com");
await ph_no.fill("7397113417");
await occ.selectOption("Engineer");
await gender.click();
await pwd.fill("Testing@123");
await confirm_pwd.fill("Testing@123");

// await checkbox.scrollIntoViewIfNeeded();  // Scroll to the checkbox if needed
await check_box.waitFor({ state: 'visible' });  // Ensure the checkbox is visible
   
await check_box.click(); 

await reg.click();


//setInterval(() => {}, 5000); //set interval of 5 seconds
// await checkbox.click({ force: true }); //Force-click if the checkbox is not interacting normally.
//await page.waitForNavigation();  // wait for navigation or any response after clicking

// Add a long delay to keep the page open
// await page.waitForTimeout(30000);  // Wait for 30 seconds before closing
//await browser.close();


});


test('logging in and Finding the 1st product name',async ({page})=>{

await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");

const log_email = page.locator("#userEmail");
const log_pwd = page.locator("#userPassword");
const login = page.locator("#login");

await log_email.fill("sssmeena207@gmail.com");
await log_pwd.fill("Testing@123");
await login.click();

const first_product = page.locator(".card-body b");

console.log(await first_product.first().textContent());

}); 




