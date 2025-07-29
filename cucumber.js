
module.exports = {
    default: {
        // Especifica la ruta a tus archivos de features.
        paths: ['features/**/*.feature'],

        // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
        require: [
            'support/world.js', 
            'step_definitions/**/*.js', // Tus pasos de Gherkin
            'support/**/*.js'          // Archivos de hooks (Before, After)
        ],

        // Define el formato de la salida en la consola y para los reportes.
        format: [
            'progress-bar', // Muestra una barra de progreso cucudurante la ejecución
            'json:reports/cucumber-report.json' // Genera un reporte JSON
        ],

        // Permite pasar parámetros a tu World personalizado.
        worldParameters: {
            baseUrl: 'https://test-adl.leonardojose.dev/login'
        }
    }
}
