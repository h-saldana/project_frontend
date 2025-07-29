Feature: Acceso y eliminación de producto
    Background:
    Given el usuario se encuentra en la página login
    And hace uso de credenciales válidas
    And redirige a la página del dashboard
  
  
  Scenario: Usuario accede al sistema y elimina un producto desde el dashboard  

    When se dirige a la página articulos
    When elimina el producto identificado como "3591"
    And permanece en la página de artículos