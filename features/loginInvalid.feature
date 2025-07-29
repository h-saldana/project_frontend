Feature: Login invalido para acceso al sistema

  Background:
    Given navega a la página de login

  Scenario: Usuario no registrado intenta acceder al sistema
    When el usuario ingresa un email y contraseña inválidos
    And el usuario pulsa el botón ingresar
    Then permanece en la página de login