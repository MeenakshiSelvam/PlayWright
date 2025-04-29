const {LoginPage } = require('./LoginPage');
const {DashboardPage } = require('./DashboardPage');
const {CheckoutPage } = require('./CheckoutPage');


class POManager{


    constructor(page)
    {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }




    getLoginPage()  //custom method
    {
        return this.loginPage;
    }


    getDashboardPage()  //custom method
    {
        return this.dashboardPage;
    }

    getCheckoutPage()  //custom method
    {
        return this.checkoutPage;
    }

}
module.exports = {POManager};

