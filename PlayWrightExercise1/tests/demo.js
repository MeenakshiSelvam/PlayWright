let message= 1234;
message = 'hello';

//dynamic data type.

let no = [1,2,3];

console.log(message);


function add(a,b)
{
    return a+b;
}
add(3,4);

let obj = {name:"abc",age:20};
obj.location = "chennai";

const {When,Then,Given} = require('@cucumber/cucumber');
const {expect,playwright} = require('@playwright/test'); //importing playwright object.
//test is needed in Mocha framework, in cucumber its not needed.

const { POManager } = require('../../PageObjects/POManager');


//{timeout:100*1000} can be set if it takes more time.
Given('a login to Ecommerce application with username and password', {timeout:100*1000},async function (username, password) {

//browser can be created by using playwright object.becoz in cucumber we can't execute test() so we can't use page,browser fixture.
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage(); 
    this.poManager = new POManager(page); //this.poManager is a world constructor.



        const loginPage = await this.poManager.getLoginPage();
        
        
        await loginPage.goTo();
        await loginPage.validLogin(username, password);

  });


  When('Add productName to Cart', async function (productName) {
   
    this.dashboardPage = await this.poManager.getDashboardPage();
    await dashboardPage.searchandAddCart(productName); 
  
 
  });


  Then('verify productName is displayed in cart', async function (productName) {
    this.dashboardPage = await this.poManager.getDashboardPage();
    await dashboardPage.navigateToCart();
    
  });

  When('Enter Valid Details and Place the Order', async function () {
    this.checkoutPage = await this.poManager.getCheckoutPage();

    await checkoutPage.CheckoutFillandPlaceOrder();
   
  });

  Then('verify order is present in OrdersHistory Page', async function () {
   this.checkoutPage = await this.poManager.getCheckoutPage();

    const Id = await page.locator("td label").nth(1).textContent();
    await checkoutPage.verifyingOrder(Id);
    
   
  });

 
