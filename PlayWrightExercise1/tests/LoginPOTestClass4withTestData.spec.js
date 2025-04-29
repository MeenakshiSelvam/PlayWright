const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');
const {customTest} = require('../utils/test-base');


//here we are using custom fixture to access TestData.


customTest('Login using custom fixture', async ({ page,testDataForOrder }) => {   //we can use custom page fixture.
  const poManager = new POManager(page);

  const loginPage = await poManager.getLoginPage();
  const dashboardPage = await poManager.getDashboardPage();
  const checkoutPage = await poManager.getCheckoutPage();

  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);


  await dashboardPage.searchandAddCart(testDataForOrder.productName); 
  await dashboardPage.navigateToCart();



  await checkoutPage.CheckoutFillandPlaceOrder();


}
);








