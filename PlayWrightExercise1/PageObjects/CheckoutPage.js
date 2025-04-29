class CheckoutPage{

    constructor(page)
    {
    
        //this referes to current class.
    
        //this.checkoutButton =  
        this.country = page.locator("[placeholder*='Country']");
        this.coupon = page.locator("[name='coupon']");
        this.couponSubmit =  page.locator("[type='submit']");
        this.cvv =  page.locator("(//input[@type='text'])[2]");
        this.placeOrder = page.locator(".btnn.action__submit.ng-star-inserted");

        this.orders = page.locator("[routerlink*='orders']");

        this.page = page;
    }
    

    async CheckoutFillandPlaceOrder()
    {

        await this.page.locator("//button[text()='Checkout']").click();
        
        await this.country.pressSequentially('Ind');    
        await this.page.getByRole("button",{name: 'India'}).nth(1).click(); 
    //     await this.country.pressSequentially("Ind"); 
    //     const dropdown = await this.page.locator("section.ta-results.list-group.ng-star-inserted");
        
    //     await dropdown.waitFor();    
    //     const optcount = await dropdown.locator("button").count(); 
        
    // for (let i=0; i<optcount; i++)
    //     {
    //         const value = (await dropdown.locator("button").nth(i).textContent())?.trim() || ''; 
            
    //         if(value === "India"){
    
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    
    //     }}
    await this.coupon.fill("rahulshettyacademy");
    await this.couponSubmit.click();
    await this.cvv.fill("123");

    await this.placeOrder.click(); 

    
    
    }

    async verifyingOrder()
    {
        
        
        
        this.Id =  await this.page.locator("td label").nth(1).textContent();
        
        this.orders.first().click();
       
        const rows =await this.page.locator("tbody tr");

       
for(let i = 0; i < await rows.count(); i++)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();  //tbody tr th
        
        if(this.Id.includes(rowOrderId)) //no trim needed if we use includes bcoz it check whether these characters are in.//it checks whether string 1 contains string 2.
     
        {
                await rows.nth(i).locator("button").first().click(); //tbody tr button.
                console.log(rowOrderId);
                break;
                         
        }

    }
}}
module.exports = {CheckoutPage};


