// const { exec } = require('child_process');
const { test, expect } = require('playwright/test');

const baseUrl = 'https://test-adl.leonardojose.dev';
const users = {
  validUser: {
    email: 'testeradl@test.com',
    password: 'Tester@2025'
  },
  invalidUser: {
    email: 'juan@perez.com',
    password: 'perez2025'
  }
};

const product = {
  iphone16: {
    codigoSKU: 'IPHONE-2025',
    descripcion: 'iPhone de última generación',
    stockActual: '100',
    costo: '300',
    precioVenta: '400'
  },
  newIphone: {
    codigoSKU: 'IPHONE-PRO-MAX',
    descripcion: 'iPhone 16 128gb negro - Marca Apple',
    stockActual: '15',
    costo: '549990',
    precioVenta: '849990'
  }

}
//  item 1
test.describe('Validar acceso al sistema y consulta de productos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  test('Registro y consulta de productos', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/login/);
    await page.getByLabel('Email').fill(users.validUser.email);
    await page.getByLabel('Contraseña').fill(users.validUser.password);
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page.getByText('Bienvenido al sistema ERP.')).toBeVisible();
    await expect(page).toHaveURL(/dashboard/);
    await page.locator('span:has-text("Entidades")').click();
    await page.locator('text=Artículos').click();
    await expect(page.getByText('Listado de Artículos')).toBeVisible();
    await expect(page).toHaveURL(/articulos/);
  })


});
// item 2:
test.describe('validando registro de productos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  test('Acceso al sistema y registro de producto', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
    await page.getByLabel('Email').fill(users.validUser.email);
    await page.getByLabel('Contraseña').fill(users.validUser.password);
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page).toHaveURL(/dashboard/);
    
    await page.locator('span:has-text("Entidades")').click();
    await page.locator('text=Artículos').click();
    await expect(page).toHaveURL(/articulos/);

    await page.getByRole('button', { name: 'Crear Artículo' }).click();
    await expect(page).toHaveURL(/nuevo/);

    await page.getByLabel('Código (SKU)').fill(product.iphone16.codigoSKU);
    await page.getByLabel('Descripción').fill(product.iphone16.descripcion);
    await page.getByRole('spinbutton', { name: 'Stock Actual' }).fill(product.iphone16.stockActual);
    await page.getByRole('spinbutton', { name: 'Costo' }).fill(product.iphone16.costo);
    await page.getByRole('spinbutton', { name: 'Precio Venta' }).fill(product.iphone16.precioVenta);
    await page.getByLabel('Unidad de Medida').selectOption('Unidad');
    
    await page.getByRole('button', { name: 'Guardar Cambios' }).click();
    await expect(page).toHaveURL(/articulos/);   

  });
// item 3:
  test.describe('Actualizando nuevo producto iPhone Pro Max', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${baseUrl}/login`, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    test('Acceso al sistema y modificación del producto', async ({ page }) => {
      
      await expect(page).toHaveURL(/login/);
      await page.getByLabel('Email').fill(users.validUser.email);
      await page.getByLabel('Contraseña').fill(users.validUser.password);
      await page.getByRole('button', { name: 'Ingresar' }).click();

      await expect(page).toHaveURL(/dashboard/);
      await page.locator('span:has-text("Entidades")').click();
      await page.locator('text=Artículos').click();
      await expect(page).toHaveURL(/articulos/);  
      
      await page.getByRole('button', { name: '3255' }).first().click();
      await page.getByLabel('Código (SKU)').fill(product.newIphone.codigoSKU);
      await page.getByLabel('Descripción').fill(product.newIphone.descripcion);
      await page.getByRole('spinbutton', { name: 'Stock Actual' }).fill(product.newIphone.stockActual);
      await page.getByRole('spinbutton', { name: 'Costo' }).fill(product.newIphone.costo);
      await page.getByRole('spinbutton', { name: 'Precio Venta' }).fill(product.newIphone.precioVenta);

      await page.getByLabel('Unidad de Medida').selectOption('Caja');
      await page.getByRole('button', { name: 'Guardar Cambios' }).click();
      await expect(page.getByText(`Artículo "${product.newIphone.descripcion}" actualizado con éxito!`)).toBeVisible();
      await expect(page).toHaveURL(/articulos/);

    })   

  })
// item 4:
  test.describe('Eliminando producto', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${baseUrl}/login`, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    test('Acceso al sistema y eliminación de producto', async ({ page }) => {
      
      await expect(page).toHaveURL(/login/);
      await page.getByLabel('Email').fill(users.validUser.email);
      await page.getByLabel('Contraseña').fill(users.validUser.password);
      await page.getByRole('button', { name: 'Ingresar' }).click();

      await expect(page).toHaveURL(/dashboard/);
      await page.locator('span:has-text("Entidades")').click();
      await page.locator('text=Artículos').click();
      await expect(page).toHaveURL(/articulos/);  
      // al final hace la eliminación del dashboard:
      await page.getByRole('button', { name: '3595' }).nth(1).click();      
      await expect(page.getByText('Artículo eliminado con éxito.')).toBeVisible();
      await expect(page).toHaveURL(/articulos/);

    });

  })
// item 5:
  test.describe('Validar el no acceso al sistema', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  test('login de usuario no registrado', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/login/);
    await page.getByLabel('Email').fill(users.invalidUser.email);
    await page.getByLabel('Contraseña').fill(users.invalidUser.password);
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.getByText('Las credenciales proporcionadas son incorrectas.').click();
    await expect(page).toHaveURL(/login/);
    
  })


});

});
