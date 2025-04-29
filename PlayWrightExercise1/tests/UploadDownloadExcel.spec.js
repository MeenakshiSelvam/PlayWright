const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');


async function writeexcel1(searchText,replaceText,change,filePath) {    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const OUTput = await readexcel1(worksheet,searchText);
    const Gcell = worksheet.getCell(OUTput.row,OUTput.column+change.colChange);  //use change.colchange to move the column.
    Gcell.value = replaceText; //writing 
    await workbook.xlsx.writeFile(filePath); //saving.
}


async function readexcel1(worksheet,searchText)
{

    let output = {row: -1,column: -1};

    worksheet.eachRow((row, rowNo) => 
        {
    
            row.eachCell((cell, colno) => 
            {
                if (cell.value === searchText) {
                    console.log(rowNo);
                    console.log(colno);
    
                    output.row = rowNo;
                    output.column = colno;
    
                } })})

        return output;
}

//writeexcel1("Mango",250,{rowChange: 0,colChange:2},"D:\exceldw.xlsx"); //1st arg is search text, 2nd is replace text.

test('Upload/download excel',async({page})=>
{

const text = 'Mango';
const updatedValue = 251;

    // i. downloading file

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    await page.pause();
    const dwPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await dwPromise; //it waits until dw completed.

    // or
    //await page.locator('button',{name: 'Download'}).click();


    // ii. updating the file by calling method.
    writeexcel1(text,updatedValue,{rowChange: 0,colChange:2},"D:\exceldw.xlsx"); 

    //iii. uploading a file

    await page.pause();
    //await page.locator("#fileinput").click();
    
    await page.locator(".upload").setInputFiles("D:\exceldw.xlsx"); //element type should be file then only file can be uploaded.


   const Text = await page.getByText(text); //mango
   const desiredRow = await page.getByRole('row').filter({has:Text}); //it filters row contains Mango Text.

   expect(desiredRow.page.locator("#cell-4-undefined")).tocontainText(updatedValue); //it finds price of mango.

  



    


})



