// support/screenshot-helper.js
class ScreenshotHelper {
    constructor(page) {
        this.page = page;
        this.screenshotCounter = 0;
    }

    async takeScreenshot(name, options = {}) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}-${timestamp}.png`;
        const fullPath = `reports/screenshots/${filename}`;

        const defaultOptions = {
            path: fullPath,
            fullPage: true,
            ...options
        };

        await this.page.screenshot(defaultOptions);
        console.log(`📸 Screenshot: ${filename}`);
        return filename;
    }

    async takeScreenshotOnError(stepName, error) {
        const filename = await this.takeScreenshot(`ERROR-${stepName}`);
        console.error(`❌ Error en step "${stepName}": ${error.message}`);
        return filename;
    }

    async takeScreenshotOfElement(selector, name) {
        const element = this.page.locator(selector);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `element-${name}-${timestamp}.png`;

        await element.screenshot({
            path: `reports/screenshots/${filename}`
        });

        return filename;
    }
}

module.exports = ScreenshotHelper;