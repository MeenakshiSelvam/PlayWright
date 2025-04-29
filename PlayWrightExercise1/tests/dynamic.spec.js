const {test,expect} = require('@playwright/test');

test.only('testcase1', async({page})=>{
await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");
// await page.pause();

const email = page.locator("#userEmail");
const pwd = page.locator("#userPassword");

await email.fill("sssmeena207@gmail.com");
await pwd.fill("Testing@123");
const login = page.locator("#login");
await login.click();



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

    // const prodName = await products.nth(i).locator("b").textContent();   //using sublocator
    // console.log(prodName)
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
    //wait until the page renders the information in this tag (for visible-there is no auto wait so we can use waitfor before that line)
    //waitFor not used if it returns multiple elements,used for one element.



    // to check our product is added or not,find element dynamically
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //returns true or false
    expect(bool).toBeTruthy(); 
    //or expect(bool).tobe(true);


    await page.locator("[type='button']").last().click(); //checkout
    await page.locator("[placeholder*='Country']").pressSequentially("Ind"); //select country 
    //fill() used to copy and fill whole thing at a time, pressseq() used to press each char one by one -used for some keyboard handling.
    const dropdown = await page.locator("section.ta-results.list-group.ng-star-inserted");
    await dropdown.waitFor();
    const optcount = await dropdown.locator("button").count();    // button or section[class*='ta-results'] button 
    console.log(optcount);

    // use for loop to iterate one by one and find specific element (dynamically finding) 

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


//above is we are dynamically finding elements and validating.

//below is we are statically finding particular element.

test('test case 2', async({page})=>{
      await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");
        // await page.pause();
        
        const email = page.locator("#userEmail");
        const pwd = page.locator("#userPassword");
        
        await email.fill("sssmeena207@gmail.com");
        await pwd.fill("Testing@123");
        const login = page.locator("#login");
        await login.click();
        await page.getByRole('button', { name: ' Add To Cart' }).first().click();

  // ---------------------
        
    await page.pause();
});

//dynamically findind and getting order id
test('order id', async({page})=>{
    //clicking orders and check whether our order is listed
    await page.goto("https://r.search.yahoo.com/_ylt=AwrKCSIfRi9nEQIA1zK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1732360992/RO=10/RU=https%3a%2f%2frahulshettyacademy.com%2fclient%2f/RK=2/RS=FYJa4oLvCi1v_d7YEsXjPk8850I-");
    const email = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    await email.fill("sssmeena207@gmail.com");
    await pwd.fill("Testing@123");
    const login = page.locator("#login");
    await login.click();



await page.locator("button:nth-child(2) span:nth-child(1)").click();
await page.locator("[name='coupon']").fill("rahulshettyacademy");//apply coupon
await page.locator("[type='submit']").click();
await page.locator("(//input[@type='text'])[2]").fill("123"); //cvv
await page.locator("select.input.ddl").last().selectOption("02"); //expiry yr
await page.locator("select.input.ddl").first().selectOption("02"); //expiry date
await page.locator("(//input[@type='text'])[3]").fill("Meena"); //name on coupon
await page.locator(".btnn.action__submit.ng-star-inserted").click(); 

    

await page.pause();



});