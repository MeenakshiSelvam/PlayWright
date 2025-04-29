
    const playwright =  require('@playwright/test');
    const {Before,After, BeforeStep, AfterStep,Status} = require('@cucumber/cucumber'); //importing before hooks.



    const { POManager } = require('../../PageObjects/POManager');

    Before({tags: "@outline"},async function(){ //before scenario.
    const browser = await playwright.chromium.launch({
        headless:false
        });
        const context = await browser.newContext();
        this.page = await context.newPage(); 
        this.poManager = new POManager(this.page); //this.poManager is a world constructor. //this.var can be used for all files globally.

    });


    After(async function(){

    });

    BeforeStep(async function(){ //will be executed before all steps.
        console.log("step is started exection");

    })

    AfterStep(async function({result}){  //will be executed after steps. 
        console.log("step execution is completed");


        if(result.status === Status.FAILED) { //take ss on step failure.  
            await this.page.screenshot({path : 'ss1.png'});
        }

    })

