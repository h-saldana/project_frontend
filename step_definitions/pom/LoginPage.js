const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      emailInput: 'label:has-text("Email")',
      passwordInput: 'label:has-text("Contraseña")',
      loginButton: 'button:has-text("Ingresar")',
      welcomeMessage: 'text=Bienvenido al sistema ERP.',
    };
    this.loginURL = '/login';
  }
// original codigo:
  async navigate() {
    await this.page.goto(this.loginURL, { timeout: 30000, waitUntil: 'domcontentloaded' });
    // await this.page.goto(this.loginURL, { timeout: 40000, waitUntil: 'load' });
    await this.page.waitForURL(/.*\/login/);
  }

 
  // LOGIN ORIGINAL, CAMBIAR EN CASO DE ERROR POR PROBLEMAS: 
  async login(email, password) {
    // agregado para evitar errores de navegación
    await this.page.waitForURL(/login/, { timeout: 5000 });
    // *******************************************************
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Contraseña').fill(password);
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
  }

  async verifyLoginSuccess() {
    await this.page.waitForURL(/dashboard/);
    await expect(this.page.getByText('Bienvenido al sistema ERP.')).toBeVisible();
  }

  async accederComoUsuarioValido(email, password) {
    console.log('[LoginPage] Iniciando flujo completo de login como usuario válido');

    await this.navigate();           // Navegación blindada con validaciones
    await this.login(email, password);  // Ingreso de credenciales
    await this.verifyLoginSuccess();    // Confirmación de dashboard

    console.log('[LoginPage] Login exitoso para:', email);
  }

  
}
module.exports = LoginPage;