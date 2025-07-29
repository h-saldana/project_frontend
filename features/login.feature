# Feature: Validar acceso al sistema y consulta de productos

#   Background:
#     Given el usuario navega al sitio

#   Scenario: Registro y consulta de productos
#     Given el usuario se encuentra en la página de login
#     When ingresa el email válido
#     When ingresa el password válido
#     When hace clic en el botón ingresar
#     Then accede al dashboard correctamente
#     # When navega hacia la sección de Artículos
#     # Then visualiza el listado de Artículos

Feature: Validar acceso al sistema y consulta de productos

  Background:
    Given el usuario navega al sitio

  Scenario: Registro y consulta de productos
    Given el usuario navega al sitio
    When el usuario ingresa el email válido
    When el usuario ingresa el password válido
    When el usuario hace clic en el botón ingresar
    Then accede al dashboard y deberia ver el mensaje "Bienvenido al sistema ERP"