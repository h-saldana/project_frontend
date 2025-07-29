const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../step_definitions/pom/LoginPage.js');
const ProductPage = require('../step_definitions/pom/ProductPage');

Given('el usuario accede al login del sistema', async function () {
  await this.loginPage.navigate();
});

Given('ingresa credenciales válidas', async function () {
  const { email, password } = this.testData.users.validUser;
  await this.loginPage.login(email, password);
});

Given('accede al dashboard principal', async function () {
  await this.loginPage.verifyLoginSuccess();
});

 Given('navega al módulo de artículos', async function () {
    this.productPage = new ProductPage(this.page);
    await this.productPage.navigateToArticulos();
 });

When('hace click en el SKU del producto "IPHONE-PRO-MAX"', async function () {
await this.page.getByRole('cell', { name: 'IPHONE-PRO-MAX' }).click();
})

When('edita el producto existente', async function () {
  await this.productPage.clickBotonEditarPrincipal();
});

When('actualiza los datos del producto con los nuevos valores', async function () {
  const producto = this.testData.product.newIphone;
  await this.productPage.registrarProducto(producto);
});

When('presiona el botón "Guardar Cambios"', async function () {
  await this.page.getByRole('button', { name: 'Guardar Cambios' }).click();
});

Then('redirige al listado de artículos', async function () {
  await expect(this.page).toHaveURL(/articulos/);
});