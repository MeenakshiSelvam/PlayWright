const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');


//using testdata file to get data and use it for value instead of hard code.

//Json.parse-converts json to js obj it may not work sometime so convert JSON to string to JS obj.

const dataSet = JSON.parse(JSON.stringify(require("../utils/TestDataFile.json")));

// we can use only one data set and access using dataSet.usernmae,.. or we can use arrayDataSet and access using for loop and data.username,..

for (const data of dataSet) {

test(`Login for ${data.productName}`, async ({ page }) => {  // `${}` - use this - we need to give unique testcases for each dataset.
      const poManager = new POManager(page);

        const loginPage = await poManager.getLoginPage();
        const dashboardPage = await poManager.getDashboardPage();
        const checkoutPage = await poManager.getCheckoutPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);


        await dashboardPage.searchandAddCart(data.productName); //use await for calling every method from pageobject.
        await dashboardPage.navigateToCart();



        await checkoutPage.CheckoutFillandPlaceOrder();

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        await checkoutPage.verifyingOrder();
        await page.pause();
    });
}

