const {test,expect,request} = require('@playwright/test'); //request - used for web api testing.

const loginPayload = {userEmail: "sssmeena207@gmail.com", userPassword: "Testing@123"};//we r storing json as js obj. //at run time, it will be converted as json.

let loginToken;

test.beforeAll(async()=>{

   const apiContext=  await request.newContext(); // in new context we can give whatever that we want to execute default while opening browser like (url,proxy,cred..)
   
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    });

    expect(await loginResponse).toBeOK();
     //ok checks whether status code from 200 to 299

    const loginResponseJson = (await loginResponse).json;
     //loginresponsejson - it as an Object so we can call object to get token.

    const loginToken = await loginResponseJson.token;
    console.log(loginToken);

});  

test.beforeEach(()=>{

});  



test('Login1', async({page})=>{



    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value); //key and pair
    }, loginToken);  //to inject token in local storage by using js code. 


    await page.goto("https://rahulshettyacademy.com/client");
// const email = page.locator("#userEmail");
// const pwd = page.locator("#userPassword");

// await email.fill("sssmeena207@gmail.com");
// await pwd.fill("Testing@123");
// const login = page.locator("#login");
// await login.click();

await page.pause();




const productName='ZARA COAT 3';

await page.waitForLoadState('networkidle');
const products= await page.locator(".card-body");
const count = await products.count();
console.log(count);

await page.waitForLoadState('networkidle');

const titles= await page.locator(".card-body b").allTextContents();
console.log(titles);
// to get all products name

//to check and get one specific product

await page.waitForLoadState('networkidle');
await page.pause();

for (let i=0; i<count; i++) {
   
    await page.pause();

   
    if(await products.nth(i).locator("b").textContent() === productName)
    {

        await page.pause();

        //add to cart   
        
        await products.nth(i).locator("i.fa.fa-shopping-cart").click();
       
        break;

    }

    }

    // validate whether item has been added to cart or not.
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); 
   
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //returns true or false
    expect(bool).toBeTruthy(); 

    await page.locator("[type='button']").last().click(); //checkout
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const dropdown = await page.locator("section.ta-results.list-group.ng-star-inserted");
    await dropdown.waitFor();
    const optcount = await dropdown.locator("button").count();   
    console.log(optcount);

    for (let i=0; i<optcount; i++)
    {
        const value = (await dropdown.locator("button").nth(i).textContent())?.trim() || ''; 
        // trim() can't be used directly with textcontent-bcoz if it returns null, trim can't be a function for null.
        //if there is string it will be trimmed or empty string will be passed.

        if(value === "India"){

        await dropdown.locator("button").nth(i).click();
        break;

    }}

//to check whether given email id is present.
const emailId = "sssmeena207@gmail.com";
expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId); //await can be used or can't be used.

await page.locator("[name='coupon']").fill("rahulshettyacademy");//apply coupon
await page.locator("[type='submit']").click();
await page.locator("(//input[@type='text'])[2]").fill("123"); //cvv
await page.locator("select.input.ddl").last().selectOption("02"); //expiry yr
await page.locator("select.input.ddl").first().selectOption("02"); //expiry date
await page.locator("(//input[@type='text'])[3]").fill("Meena"); //name on coupon
await page.locator(".btnn.action__submit.ng-star-inserted").click(); 

expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

const Id = await page.locator("td label").nth(1).textContent();
console.log(Id);


await page.pause();

await page.locator("[routerlink*='orders']").first().click();


//const itemId = Id.replace(/[| ]/g, '');
await page.locator("tbody").waitFor(); //it waits until tbody tag attached to Dom.
const rows =await page.locator("tbody tr");


for(let i = 0; i < await rows.count(); i++)
{
    const rowOrderId = await rows.nth(i).locator("th").textContent();  //tbody tr th

    if(Id.includes(rowOrderId)) //no trim needed if we use includes bcoz it check whether these characters are in.//it checks whether string 1 contains string 2.
 
    {
            await rows.nth(i).locator("button").first().click(); //tbody tr button.
            console.log(rowOrderId);
            break;
                     
    }
    const lastId = await page.locator(".col-text ").textContent();
    expect(Id.includes(lastId)).toBeTruthy();
   

}

await page.pause();




});
