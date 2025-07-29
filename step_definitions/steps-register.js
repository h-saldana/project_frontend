const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../step_definitions/pom/LoginPage.js');
const ProductPage = require('../step_definitions/pom/ProductPage.js');


Given('el usuario navega a la página de login', async function () {
  await this.loginPage.navigate();
});

Given('el usuario ingresa credenciales válidas', async function () {
  const { email, password } = this.testData.users.validUser;
  await this.loginPage.login(email, password);
});

Given('accede correctamente al dashboard', async function () {
  await this.loginPage.verifyLoginSuccess();
});

Given('el usuario navega al módulo de artículos', async function () {
  await this.productPage.navigateToArticulos();
});

When('el usuario presiona "Crear Artículo"', async function () {
  const boton = await this.page.getByRole('button', { name: 'Crear Artículo' });
  await expect(boton).toBeVisible(); // opcional pero recomendado
  await boton.click();
});

When('completa el formulario con los datos del producto', async function () {
  const producto = this.testData.product.iphone16;
  await this.productPage.registrarProducto(producto);
});


Then('el sistema redirige al listado de artículos', async function () {
  await expect(this.page).toHaveURL(/articulos/);
});