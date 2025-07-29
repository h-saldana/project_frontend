// helpers/validateProducto.js
function validateProducto(producto) {
  const camposEsperados = ['codigoSKU', 'descripcion', 'stockActual', 'costo', 'precioVenta'];
  const errores = [];

  for (const campo of camposEsperados) {
    const valor = producto[campo];
    if (typeof valor === 'undefined' || valor === '') {
      errores.push(`🔴 Campo faltante o vacío: ${campo}`);
    }
  }

  if (errores.length) {
    console.error('[VALIDACIÓN PRODUCTO] Fallos detectados:\n' + errores.join('\n'));
    throw new Error('❌ Datos incompletos para producto. Revisa el testData.');
  } else {
    console.log('[VALIDACIÓN PRODUCTO] Todos los campos están presentes ✅');
  }
}

module.exports = validateProducto;