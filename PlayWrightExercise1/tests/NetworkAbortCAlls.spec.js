const {test,request,expect} = require('@playwright/test');

test('abort network calls', async({page})=>{

    //page.route('**/*.css',route=> route.abort());

    page.route('**/*.{jpg,png,jpeg}',route => route.abort());

    const user = page.locator("[name='username']");
    const pwd = page.locator("[name='password']");

//page.on(event,listener) - listener it will invoke or trigerred when some event is occurred.

//whenever any request is made, we print all urls until the page is loaded completely
  //  page.on('request',request => console.log(request.url())); // url() method - used to get all urls 

    //whenever any response we get, we print all responses
    page.on('response', response=> console.log(response.url(),response.status(),response.statusText()));

await page.goto("https://rahulshettyacademy.com/loginpagePractise");
// await page.pause();  


await user.fill("rahulshettyacademy");
await pwd.fill("learning");
await page.locator("[type='submit']").click();

await page.pause();
});







//aborting request call.
//printing req and responses.

