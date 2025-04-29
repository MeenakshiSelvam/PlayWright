import {Page} from '@playwright/test'; //importing page type.
import {expect,Locator} from '@playwright/test';  //importing locator type.

export class LoginPage {



    page : Page;
    signInButton : Locator;
    username : Locator;
    password : Locator;

constructor(page : Page)
{





    //this referes to current class.

    this.signInButton= page.locator("[type='submit']");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.page = page;
}


async goTo()

{
    
await this.page.goto("https://rahulshettyacademy.com/client");

}

async validLogin(username:string,password:string)
{
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');

}

}





