
export class apiUtils{



    apiContext : any;

    loginPayload: string;
    constructor(apiContext : any,loginPayload : string)
    {

        //this.localcontext - new instance variable.
this.apiContext = apiContext;
this.loginPayload = loginPayload;
    }

    

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            })
        
            //expect(loginResponse).toBeOK();
            const loginResponseJson = await loginResponse.json();
            const loginToken = loginResponseJson.token;
            console.log(loginToken);
            return loginToken;


    }

    async createOrder(orderPayload:any)
    {

        let response =  { loginToken : " ", orderId: " "};
        response.loginToken = await this.getToken(); 
        
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload ,
        headers:{
            'Authorization' :  response.loginToken,  // this referes current class. - we r calling this class gettoken method to get token.
            'Content-Type' : "application/json"
        },

    });

    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;  
    return response;  



}
}