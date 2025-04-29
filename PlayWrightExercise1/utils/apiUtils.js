
class apiUtils{


    constructor(apiContext,loginPayload)
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

    async createOrder(orderPayload)
    {

        let response = {} ; //creating js obj 
        response.loginToken = await this.getToken(); //creating property for response and store token.
        
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload ,
        headers:{
            'Authorization' :  response.loginToken,  // this referes current class. - we r calling this class gettoken method to get token.
            'Content-Type' : "application/json"
        },

    });

    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;  //creating order id property to the response obj and storing orderId.
    return response;  // returing response which have two property (orderid,logintoken). 
    //response will have (response.loginToken, response.orderId).




}
}
module.exports = {apiUtils}; //this apiutils file will be globally visible/accessible to all the files in project.
//file name and class name will match.

