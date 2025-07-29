const testData = require('../fixtures/testData.js');
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const LoginPage = require('../step_definitions/pom/LoginPage.js');
const ProductPage = require('../step_definitions/pom/ProductPage.js');

const fs = require('fs');
const path = require('path');
// Asegúrate de que la ruta sea correcta
// const testData = require('../fixtures/testData.js'); // o donde tengas users/product
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

Before(async function () {
    // 'this' es una instancia de tu CustomWorld
    await this.init();
    this.testData = testData;
    this.codigoProductoExistente = '3255';

    // this.testData = require('../fixtures/testData');
    console.log('[TestData Hook]', testData?.users?.validUser?.email);
    this.loginPage = new LoginPage(this.page);
    this.ProductPage = new ProductPage(this.page);
    

    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    // Instanciamos los Page Objects para cada escenario, pasándoles la nueva página
    // this.loginPage = new LoginPage(this.page);
    // this.securePage = new SecurePage(this.page);
});

AfterStep(async function (scenario) {
    if (this.page) {
        //Si desean screenshots en cada paso
        /*
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `step-${scenarioName}-${timestamp}.png`;

        await this.page.screenshot({
            path: `reports/screenshots/${filename}`,
            fullPage: true
        });
        */
    }
});

After({timeout: 30000}, async function (scenario) {
    //Solo toma screenshoot cuando falla
    //if (scenario.result.status === Status.FAILED) {
    // page.screenshot() sin 'path' devuelve la imagen como un buffer
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Adjunta la imagen al reporte de Cucumber.
    // Esto es lo que permite que cucumber-html-reporter la muestre.
    this.attach(screenshot, 'image/png');
    //}

    //Grabando video.
    const videoPath = await this.page.video()?.path();

    // await this.cleanup();
    try {
        await this.cleanup();
    } catch (err) {
        console.error('❌ Error en cleanup:', err);
    }

    if (videoPath) {
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const newVideoPath = `reports/videos/${scenarioName}-${timestamp}.webm`;

        // Renombrar video con nombre descriptivo
        if (fs.existsSync(videoPath)) {
            fs.renameSync(videoPath, newVideoPath);
            console.log(`🎥 Video guardado: ${newVideoPath}`);

            // Adjuntar video al reporte (si el reporter lo soporta)
            const videoBuffer = fs.readFileSync(newVideoPath);
            this.attach(videoBuffer, 'video/webm');
        }
    }
});
