const { expect } = require('@playwright/test');
const LoginPage = require('./LoginPage');
const validateProducto = require('../../helpers/validateProducto.js');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);

    this.selectors = {
      entidadesMenu: 'span:has-text("Entidades")',
      articulosSubmenu: 'text=Artículos',
      crearArticuloBtn: 'button:has-text("Crear Artículo")',
      guardarBtn: 'button:has-text("Guardar Cambios")',
    };

    this.camposProducto = {
      codigoSKU: 'Código (SKU)',
      descripcion: 'Descripción',
      stockActual: 'Stock Actual',
      costo: 'Costo',
      precioVenta: 'Precio Venta'
    };

    this.articulosURL = '/articulos';
    this.nuevoArticuloURL = '/nuevo';
  }

  async navigateToArticulos() {
    await this.page.locator(this.selectors.entidadesMenu).click();
    await this.page.locator(this.selectors.articulosSubmenu).click();
    await expect(this.page).toHaveURL(new RegExp(this.articulosURL));
  }

  async iniciarCreacionArticulo() {
    await this.page.locator(this.selectors.crearArticuloBtn).click();
    await expect(this.page).toHaveURL(new RegExp(this.nuevoArticuloURL));
  }

  async fillCampoSeguro(label, valor) {
    const campo = this.page.getByLabel(label);
    try {
      await campo.waitFor({ state: 'visible', timeout: 5000 });
      await campo.fill(valor);
      console.log(`[OK] Campo "${label}" rellenado`);
    } catch {
      const fallback = this.page.locator(`input[placeholder*="${label}"], input[name*="${label}"]`);
      await fallback.waitFor({ state: 'visible', timeout: 5000 });
      await fallback.fill(valor);
      console.log(`[RECUPERADO] Fallback para campo "${label}" rellenado`);
    }
  }

  async registrarProducto(producto) {
    try {
      console.log('[DEBUG] Iniciando registro de producto...');
      console.log('[DEBUG] Datos recibidos:', producto);

      validateProducto(producto);

      for (const [key, valor] of Object.entries(producto)) {
        const label = this.camposProducto[key];
        if (label) await this.fillCampoSeguro(label, valor);
      }

      const unidadSelector = this.page.getByLabel('Unidad de Medida');
      await expect(unidadSelector).toBeVisible({ timeout: 7000 });
      await unidadSelector.selectOption('Unidad');

      console.log('[DEBUG] Todos los campos completados. Procediendo al click de guardar.');

      // Promise original:
      // await Promise.all([
      //   this.page.waitForResponse(resp =>
      //     resp.url().includes('/articulos') && resp.status() === 200
      //   ),
      //   this.page.getByRole('button', { name: 'Guardar Cambios' }).click()
      // ]);
      await Promise.all([
        this.page.getByRole('button', { name: 'Guardar Cambios' }).click(),
        this.page.waitForURL(/articulos/, { timeout: 10000 }) // o selector de éxito visible
      ]);

      await expect(this.page).toHaveURL(new RegExp(this.articulosURL));
      console.log('[DEBUG] Redirección exitosa al listado de artículos ✅');
    } catch (error) {
      console.error('[ERROR] Falló el registro del producto:', error);
      await this.page.screenshot({ path: 'evidencia_error_registro.png' });
      throw new Error(`❌ Error durante el registro del producto: ${error.message}`);
    }
  }

  async editarProductoPorCodigo(codigo) {
    console.log(`[DEBUG] Buscando producto con código: ${codigo}`);
    const fila = this.page.locator(`tr:has-text("${codigo}")`);
    const botonEditar = fila.locator('button:has-text("Editar")');

    await botonEditar.waitFor({ state: 'visible', timeout: 5000 })
      .catch(async () => {
        console.error(`❌ No se encontró el botón de edición para el código "${codigo}"`);
        await this.page.screenshot({ path: `no_edita_${codigo}.png` });
        throw new Error(`No se pudo editar el producto con código: "${codigo}"`);
      });

    await botonEditar.click();
    console.log(`[OK] Producto con código "${codigo}" abierto para edición`);
  }

  async clickBotonEditarPrincipal() {
    const botonEditar = this.page.locator('button.bg-indigo-600', { hasText: 'Editar' });

    await botonEditar.waitFor({ state: 'visible', timeout: 5000 })
      .catch(async () => {
        await this.page.screenshot({ path: 'no_boton_editar_principal.png' });
        throw new Error('❌ No se encontró el botón principal de edición');
      });

    await botonEditar.click();
    console.log('[OK] Click en botón Editar principal ejecutado');
  }
  
  async confirmacionEdicionExitosa(descripcionEsperada) {
    const textoParcial = 'actualizado'; // palabra confiable del toast
    const locatorToast = this.page.locator(`.Toastify__toast:has-text("${textoParcial}")`);

    await expect(locatorToast).toBeVisible({ timeout: 4000 });

    const contenidoToast = await locatorToast.first().textContent();
    if (!contenidoToast.includes(descripcionEsperada)) {
      console.warn('⚠️ Toast visible pero no contiene la descripción esperada:', contenidoToast);
      throw new Error(`❌ El toast no contiene "${descripcionEsperada}"`);
    }

    console.log(`✅ Toast exitoso con descripción: "${descripcionEsperada}"`);
  }  

  async eliminarArticuloPorId(idProducto, posicion = 1) {
    const botones = this.page.getByRole('button', { name: idProducto });
    const botonTarget = await botones.nth(posicion);
    await botonTarget.click();
  }
}
  



module.exports = ProductPage;