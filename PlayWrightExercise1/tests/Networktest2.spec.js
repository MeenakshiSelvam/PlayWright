const { test, expect, request } = require('@playwright/test');



test('Security test request intercept', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");

    await email.fill("sssmeena207@gmail.com");
    await pwd.fill("Testing@123");
    const login = page.locator("#login");   
    await login.click();

    await page.locator("button[routerlink*='myorders']").click();


    //injecting other account's order id -checking whether orders are displayed and  view button is clickable.
    //login and reach orders page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" }) //check with other's order id

    );

    await page.locator("button:has-text('View')").first().click()

    await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


});



//it ensures unauthorized when accessing order id that not belong to u  s.

//intercepting request call.

