import {Page} from '@playwright/test';

//const {LoginPage } = require('./LoginPage');
import{LoginPage} from './LoginPage';   //import keyword name from classname
// const {DashboardPage } = require('./DashboardPage');
import{DashboardPage} from './DashboardPage';
// const {CheckoutPage } = require('./CheckoutPage');
import{CheckoutPage} from './CheckoutPage';


export class POManager{


loginPage : LoginPage ; //classname is going as type for loginPage.  
dashboardPage : DashboardPage;
checkoutPage : CheckoutPage;

page : Page ;
    constructor(page:any)
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


