const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../step_definitions/pom/LoginPage.js');
const ProductPage = require('../step_definitions/pom/ProductPage.js');


Given('el usuario se encuentra en la página login', async function () {
  await this.loginPage.navigate();
});

Given('hace uso de credenciales válidas', async function () {
  const { email, password } = this.testData.users.validUser;
  await this.loginPage.login(email, password);
});

Given('redirige a la página del dashboard', async function () {
  await this.loginPage.verifyLoginSuccess();
});

When('se dirige a la página articulos', async function () {
    this.productPage = new ProductPage(this.page);
    await this.productPage.navigateToArticulos();
 });

When('elimina el producto identificado como {string}', async function (idProducto) {
  await this.productPage.eliminarArticuloPorId(idProducto);
});

Then('permanece en la página de artículos', async function () {
  await expect(this.page).toHaveURL(/articulos/);
});
