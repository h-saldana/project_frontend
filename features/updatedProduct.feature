Feature: Edición de productos en el módulo de artículos

  Como usuario autenticado
  Quiero modificar un producto existente
  Para actualizar sus datos y mantener el inventario correcto

  Background:
    Given el usuario accede al login del sistema
    And ingresa credenciales válidas
    And accede al dashboard principal

  @iphone-pro-max
  Scenario: Modificar producto iPhone Pro Max correctamente
    Given navega al módulo de artículos
    And hace click en el SKU del producto "IPHONE-PRO-MAX"
    And edita el producto existente
    When actualiza los datos del producto con los nuevos valores   
    And presiona el botón "Guardar Cambios"
    Then redirige al listado de artículos