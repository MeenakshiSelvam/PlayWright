const base = require('@playwright/test');  //we can give any name to store and use that for method.

//{base} -  giving you just that specific part of the module.
// base - imports the entire module and assigns it to base, allowing access to all its properties.


//storing values to custom fixture and storing in customtest property and exporting it.

//here we are customizing the test behaviour.



exports.customTest = base.test.extend(
    {
        testDataForOrder: 
        {
            username : "sssmeena207@gmail.com",
            password : "Testing@123",
            productName: "ZARA COAT 3"
        }
    }
)







