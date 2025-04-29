
import {expect,type Locator,type Page} from '@playwright/test'; // imporitng page,locator types.

let message1 : Number = 1234;
message1 = 5678;
//static data type.

//even there is an error with ts, it will be compiled and run in node.

let message2 :String = 'hello';


let Var: boolean = true;

let no1 : number[] = [1,2,3];

let data: any = "this could be anything";
data = 1234;
//any variable accepts any type of data at anytime.

console.log(message1);




function add(a : number ,b : number) :number // return type 
{
    return a + b;


}

add(3,4);

let obj1: {name:string,age:number} = {name:"abcd",age:20};

obj1.name= 'abc' ;


class LoginPage {

    page:Page;

    constructor(page:any)
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
    
    
    
    
    
