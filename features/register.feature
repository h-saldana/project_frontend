# Feature: Registro de productos en el sistema ERP

#   Como usuario autenticado
#   Quiero acceder al módulo de artículos
#   Para poder registrar nuevos productos en el inventario


#   Background:
    
#     Given el usuario navega a la página de login
#     And el usuario ingresa credenciales válidas
#     And accede correctamente al dashboard
#   @timeout(15000)
#   Scenario: Registrar un producto exitosamente
#     Given el usuario navega al módulo de artículos
#     When el usuario presiona "Crear Artículo"
#     And completa el formulario con los datos del producto:    
#       | ProductoKey    | iphone16             |
#       | Código SKU     | iphone16.codigoSKU   |
#       | Descripción    | iphone16.descripcion |
#       | Stock Actual   | iphone16.stockActual |
#       | Costo          | iphone16.costo       |
#       | Precio Venta   | iphone16.precioVenta |
#       | Unidad de Medida | Unidad            |
    
#     And presiona el botón "Guardar Cambios"
#     Then el sistema redirige al listado de artículos

Feature: Registro de productos en el sistema ERP

  Como usuario autenticado
  Quiero acceder al módulo de artículos
  Para poder registrar nuevos productos en el inventario

  Background:
    Given el usuario navega a la página de login
    And el usuario ingresa credenciales válidas
    And accede correctamente al dashboard

  @timeout(15000)
  Scenario: Registrar un producto exitosamente
    Given el usuario navega al módulo de artículos
    When el usuario presiona "Crear Artículo"
    And completa el formulario con los datos del producto
    Then el sistema redirige al listado de artículos