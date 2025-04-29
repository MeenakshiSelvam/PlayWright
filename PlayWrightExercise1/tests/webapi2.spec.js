//verify if order created is showing up in history page.

//pre condition : create order,use order id.
// we can place order by using its order id
const {test,expect,request} = require('@playwright/test'); //request - used for web api testing.
const loginPayload = {userEmail: "sssmeena207@gmail.com", userPassword: "Testing@123"};//we r storing json as js obj.
let loginToken;
const orderPayload = { orders: [{ country: "India",productOrderedId: "6581ca399fd99c85e8ee7f45" }]};
let orderId;





test.beforeAll('login and placing order', async()=>{

   const apiContext=  await request.newContext(); // in new context we can give whatever that we want to execute default while opening browser like (url,proxy,cred..)
   
   //this post call replaces all login steps.
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    })

    expect(await loginResponse).toBeOK();
     //ok checks whether status code from 200 to 299

    const loginResponseJson = await loginResponse.json();

     //loginresponsejson - it as an Object so we can call object to get token.

    loginToken = await loginResponseJson.token;
    console.log(loginToken);


    // this post call replaces all the steps required for add to cart and place order.
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload ,
        headers:{ //to mention,
            'Authorization' : loginToken,
            'Content-Type' : "application/json" 
        },

    });

    const orderResponseJson = orderResponse.json();

    orderId = orderResponseJson?.orders?.[0]; //json editor - we can use id from it.
    
    
     //get 1st orderid from list of orders placed.


});  



test('Executing further steps', async({page})=>{




    // after that api login, it stores it in local storage.
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    }, loginToken);  //to inject token in local storage by using js code. 


    // again login as 2nd time by using stored token.
    await page.goto("https://rahulshettyacademy.com/client");   

await page.locator("[routerlink*='orders']").first().click();
await page.locator("tbody").waitFor();
const rows =await page.locator("tbody tr");

//viewing placed order id.
for(let i = 0; i < await rows.count(); i++)
{
    const rowOrderId = await rows.nth(i).locator("th").textContent();  

    if(orderId.includes(rowOrderId))// replacing id with this orderId
    {
            await rows.nth(i).locator("button").first().click(); 
            console.log(rowOrderId);
            break;
                     
    }
    const againId = await page.locator(".col-text ").textContent();
    // expect(orderId.includes(againId)).toBeTruthy();
   


    
}

await page.pause();




});
