//use api utils to minimize code.
const {test,expect,request} = require('@playwright/test'); //request - used for web api testing.

//import apiUtils class.
const {apiUtils} = require('../utils/apiUtils')

const loginPayload = {userEmail: "sssmeena207@gmail.com", userPassword: "Testing@123"};//we r storing json as js obj.
let respons;
const orderPayload = { orders: [{ country: "India",productOrderedId: "6581ca399fd99c85e8ee7f45" }]};
const fakePayloadOrders = {data:[],message:"No Orders"};

test.beforeAll('login and placing order', async()=>{
   
   const apiContext =  await request.newContext(); 
   const au = new apiUtils(apiContext,loginPayload); 
   respons = await au.createOrder(orderPayload); 


});  

test('Executing further steps', async({page})=>{



    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    }, respons.loginToken); 


  
    await page.goto("https://rahulshettyacademy.com/client");   

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", // use * instead of id *accept any login id.(id can be changed for a user)

        //intercepting response -- API response (playwright fake response) - to -> Browser -> that will render data on frontend.

        async route =>
        {
            //page.request - switches browser page mode to api helper mode. 
            //fetch() is used to get response, it fetches response of url given in route will be stored to route =>
            const response = await page.request.fetch(route.request()); //request() method - used to call the request.

            let body = JSON.stringify(fakePayloadOrders); //converting js obj to json obj.

            route.fulfill(
                {
                    response,
                    body

                });

        }

    ); 
    //route method is used to route or re route url the way we want.
//this mocking response needs to be written before orders is clicked.

await page.locator("[routerlink*='orders']").first().click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/672f55ddae2afd4c0bb8f1b6");

console.log(await page.locator(".mt-4").textContent());


});


// intercepting response