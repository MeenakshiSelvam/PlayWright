// const base = require('@playwright/test');
import  {test as baseTest} from '@playwright/test';

interface TestDataForOrder{
    username: string;
    password:string;
    productName: string;
}



export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder: 
        {
            username : "sssmeena207@gmail.com",
            password : "Testing@123",
            productName: "ZARA COAT 3"
        }
    }
)







