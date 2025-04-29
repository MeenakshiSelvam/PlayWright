const {Given,When,Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test'); 
//test is needed in Mocha framework, in cucumber its not needed.
const { POManager } = require('../../PageObjects/POManager');
const playwright =  require('@playwright/test'); //importing playwright object.
//{timeout:100*1000} can be set if it takes more time.(it will take time and will be complete by given timeout)
Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000},async function (username, password) {

//browser can be created by using playwright object.becoz in cucumber we can't execute test() so we can't use page,browser fixture.
    // const browser = await playwright.chromium.launch({
    //   headless:false
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage(); 
    // this.poManager = new POManager(page); //this.poManager is a world constructor.



        const loginPage = await this.poManager.getLoginPage();
        
        
        await loginPage.goTo();
        await loginPage.validLogin(username, password);
       
  });


  When('Add {string} to Cart', async function (productName) {
   
    this.dashboardPage = await this.poManager.getDashboardPage();
    await this.dashboardPage.searchandAddCart(productName); 
  
 
  });


  Then('verify {string} is displayed in cart', async function (productName) {
    this.dashboardPage = await this.poManager.getDashboardPage();
    await this.dashboardPage.navigateToCart();
    
  });

  When('Enter Valid Details and Place the Order', async function () {
    this.checkoutPage = await this.poManager.getCheckoutPage();


    await this.checkoutPage.CheckoutFillandPlaceOrder();
   
  });

  Then('verify order is present in OrdersHistory Page', async function () {
   this.checkoutPage = await this.poManager.getCheckoutPage();
    
   
    await this.checkoutPage.verifyingOrder();
    
   
  });

 


  //ECOM2 - for Invalid.feature file.

 
 Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
          
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise");
 
  const user = this.page.locator("[name='username']");
  const pwd = this.page.locator("[name='password']");
 
  await user.fill(username);
  await pwd.fill(password);
  await this.page.locator("[type='submit']").click();



 });



 Then('Verify Error Message is displayed.', async function () {
           
  const textBox = await this.page.locator("[style*='block']");
  
    
  console.log(textBox.textContent());
  // await expect(textBox.toContainText('Incorrect'));


});
