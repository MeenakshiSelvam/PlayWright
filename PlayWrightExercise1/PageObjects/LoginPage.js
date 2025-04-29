class LoginPage {

constructor(page)
{

    //this referes to current class.

    this.signInButton = page.locator("[type='submit']");
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.page = page;
}


async goTo()

{
    
await this.page.goto("https://rahulshettyacademy.com/client");

}

async validLogin(username,password)
{
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');

}

}

module.exports = {LoginPage};




