const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('el usuario navega al sitio', { timeout: 30000 }, async function () {
  await this.loginPage.navigate();
});

When('el usuario ingresa el email válido', async function () {
  await this.loginPage.page.getByLabel('Email').fill('testeradl@test.com');
});

When('el usuario ingresa el password válido', async function () {
  await this.loginPage.page.getByLabel('Contraseña').fill('Tester@2025');
});

When('el usuario hace clic en el botón ingresar', async function () {
  await this.loginPage.page.getByRole('button', { name: 'Ingresar' }).click();
});

Then('accede al dashboard y deberia ver el mensaje "Bienvenido al sistema ERP"', async function () {
  await this.loginPage.verifyLoginSuccess();
});