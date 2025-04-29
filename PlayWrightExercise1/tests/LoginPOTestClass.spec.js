const {test,expect} = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const { CheckoutPage } = require('../PageObjects/CheckoutPage');


test('testcase1', async({page})=>{

//Obj creation of LoginPage.dashboard,checkout page.

const username = "sssmeena207@gmail.com";
const password = "Testing@123";
const loginPage = new LoginPage(page);
await loginPage.goTo();
await loginPage.validLogin(username,password);

const productName='IPHONE 13 PRO';

const dashboardPage = new DashboardPage(page);
await dashboardPage.searchandAddCart(productName); //use await for calling every method from pageobject.
await dashboardPage.navigateToCart();


const checkoutPage = new CheckoutPage(page);
await checkoutPage.CheckoutFillandPlaceOrder();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

await checkoutPage.verifyingOrder();



await page.pause();




}

);
