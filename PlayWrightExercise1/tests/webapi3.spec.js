//use api utils to minimize code.
const {test,expect,request} = require('@playwright/test'); //request - used for web api testing.

//import apiUtils class.
const {apiUtils} = require('../utils/apiUtils')

const loginPayload = {userEmail: "sssmeena207@gmail.com", userPassword: "Testing@123"};//we r storing json as js obj.
let respons;
const orderPayload = { orders: [{ country: "India",productOrderedId: "6581ca399fd99c85e8ee7f45" }]};


test.beforeAll('login and placing order', async()=>{


    //it creates order by getting token.
   const apiContext=  await request.newContext(); 
   const au = new apiUtils(apiContext,loginPayload); //while creating object use const {APIUtils} as class name.
   respons = await au.createOrder(orderPayload); //calling createorder method.
//response will store response with two prop from api utils.

});  

test('Executing further steps', async({page})=>{


//bypassing login.
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    }, respons.loginToken); 


  
    await page.goto("https://rahulshettyacademy.com/client");   

await page.locator("[routerlink*='orders']").first().click();
await page.locator("tbody").waitFor();  
const rows =await page.locator("tbody tr");


for(let i = 0; i < await rows.count(); i++)
{
    const rowOrderId = await rows.nth(i).locator("th").textContent();  

    if(respons.orderId.includes(rowOrderId))
    {
            await rows.nth(i).locator("button").first().click(); 
            console.log(rowOrderId);
            break;
                     
    }
    const againId = await page.locator(".col-text ").textContent();
    expect(respons.orderId.includes(againId)).toBeTruthy();
   

}

await page.pause();

});


// JS object - can be created with {} - contain properties and methods.