const {test,expect} = require('@playwright/test');

test('testcase1', async({page})=>{
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
// await page.pause();
// await page.getByText("Top Deals").click();

await page.waitForLoadState('networkidle');

//calendar
const dateNo = "12";

const mnthNo = "11";

const yrNo = "2024";

//we can use fill(mm-dd-yyyy)
await page.locator(".react-date-picker__inputGroup").click();

await page.locator(".react-calendar__navigation__label").click();   
await page.locator(".react-calendar__navigation__label").click();

await page.getByText(yrNo).click();

//getting class name for all mnths and choose mnth.
await page.locator(".react-calendar__year-view__months__month").nth(Number(mnthNo)-1).click(); //converting string to number.

await page.locator("//abbr[text()='"+dateNo+"']").click();

const date = ""+mnthNo+"-"+dateNo+"-"+yrNo+""; // starts with "" + - gives the result into a string. = const date = "" + mnthNo + "-" + dateNo + "-" + yrNo;

 //const date = `${mnthNo}-${dateNo}-${yrNo}`;

console.log(date);

// to validate whether given date is inserted or not.
const expectedList = [mnthNo,dateNo,yrNo];
const inputs = await page.locator(".react-date-picker__inputGroup__input"); //returns  input elements

for ( let i = 0 ; i < inputs.length; i++)
{
 const value = inputs[i].getAttribute("value");
 expect(value).toEqual(expectedList[i]);
}


});

//Syntax | Language | Use case
//  inputs.length | JavaScript | Arrays, strings
//  inputs.length() | Java | Strings
//  inputs.length | Java | Arrays
//  inputs.size() | Java | Collections like List, Set, etc.


//template literals

let name = "Bob";
let right = `${name}`;

let a = 5;
let b = 10;
console.log(`Sum: ${a + b}`); // Sum: 15

function getYear() {
  return 2025;
}
console.log(`Year: ${getYear()}`); // Year: 2025
//
//let mnthNo = "04";
//let dateNo = 24; // number
//let yrNo = "2025";
//
//const date = `${mnthNo}-${dateNo}-${yrNo}`;
//console.log(date); // "04-24-2025"
