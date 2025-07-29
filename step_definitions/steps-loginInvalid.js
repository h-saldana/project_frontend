const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');



Given('navega a la página de login', { timeout: 30000 }, async function () {
  await this.loginPage.navigate();
});

Given('el usuario ingresa un email y contraseña inválidos', async function () {
  const { email, password } = this.testData.users.invalidUser;
  await this.loginPage.login(email, password);
});

When('el usuario pulsa el botón ingresar', async function () {
  await this.loginPage.page.getByRole('button', { name: 'Ingresar' }).click();
});

Then('permanece en la página de login', async function () {
    await expect(this.page).toHaveURL(/login/);
});
