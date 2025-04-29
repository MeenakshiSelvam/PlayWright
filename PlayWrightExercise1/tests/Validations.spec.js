const {test,expect} = require('@playwright/test'); // we are importing @playwright/test and storeing it to test variable and using that variable.


//here extending test behaviour to run in paralled mode.
test.describe.configure({mode:'parallel'});

test('Pop up Validationtestcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.pause();

// await page.goto("https://www.google.co.in/");
// await page.goBack(); //it goes to previous page.
// await page.goForward(); // it goes to next page.

await expect (page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect (page.locator("#displayed-text")).toBeHidden();


//On method listens if any given event(1st argument) occurs/not, and perform given action (2nd argument) on that event
//it can be at any line, it will triggerred when event arised.
page.on('dialog', dialog=> dialog.accept()); //js alert - dialog.

await page.locator("#confirmbtn").click();

//hover
await page.locator('#mousehover').hover();

//accessing child frame.
const framePage = page.frameLocator("#courses-iframe"); //it switches page to frame.
//to access use framepage.
await framePage.locator("li a[href*='lifetime-access']:visible").click(); // given locator has two element (one is visible and another not visible)
//we are clicking locator in visible mode.

//get numbers from text(
const text = await framePage.locator(".text h2").textContent();

console.log(text.split(" ")[1]); //it splits into 4 as array and getting text of index 1.

});




test('ss', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.pause();
    
 
    
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot1.png'}); // to take ss at page level

    await page.locator("#displayed-text").screenshot({page: 'element1.png'});

    await expect (page.locator("#displayed-text")).toBeHidden();
});


test('visual testing', async({page})=>{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('xyz.png');
    await page.pause();
});

//ss - store - ss
//taking ss and execute again and take ss and compare with old file.



