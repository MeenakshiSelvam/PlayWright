//const {test,expect} = require('@playwright/test');

import {expect,test,Page} from '@playwright/test';

//const { POManager } = require('../PageObjects/POManager');
import {POManager} from "../PageObjects_ts/POManager";


import {customTest} from "../utils_ts/test-base";

test('@web testcase1', async({page})=>{

const poManager = new POManager(page);

const username = "sssmeena207@gmail.com";
const password = "Testing@123";



const loginPage = await poManager.getLoginPage();
const dashboardPage =await  poManager.getDashboardPage();
const checkoutPage = await poManager.getCheckoutPage();

await loginPage.goTo();
await loginPage.validLogin(username,password);

const productName='IPHONE 13 PRO';


await dashboardPage.searchandAddCart(productName); //use await for calling every method from pageobject.
await dashboardPage.navigateToCart();


await checkoutPage.CheckoutFillandPlaceOrder();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

await checkoutPage.verifyingOrder();


await page.pause();





}

);
