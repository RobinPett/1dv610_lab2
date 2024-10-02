/**
 * Main module file for Color-Palette-Extractor
 */
import { ColorPaletteFromPixels } from "./ColorPaletteFromPixels.js"
import { ImageToPixels } from "./ImageToPixels.js"

console.log('Color-Palette-Extractor connected to browser')

/**
 * Color palette extractor.
 */
export class ColorPaletteExtractor {
    constructor () {
        // Check if browser enviroment is available
        if(!document) {
            throw new Error('Module must be used in a browser environment')
        }
    }
    /**
    * Creates a new ImageToPixels Object that loads image.
    * @param {string} url - URL to image
    * @returns
    */
    loadImage(url) {
        return new ImageToPixels(url)
    }

    /**
     * 
     * @param {Array} pixels 
     * @param {*} numberOfColorsToExtract 
     * @returns 
     */
    startExtraction(pixels, numberOfColorsToExtract) {
        const colorPaletteFromPixels = new ColorPaletteFromPixels(pixels, numberOfColorsToExtract)
        return colorPaletteFromPixels
    }

    /**
     * Presents the color palette as colored divs.
     * Ignoring alpha channel. 
     * 
     * @param {Array} colorPalette - Array of color palette objects: { red, green, blue, alpha }
     * @param {number} size - Size of each square div in px. 
     * @returns {HTMLDivElement} - Color Palette container div.
     */
    presentColorPalette(colorPalette, size) {
        if (!size) size = 100

        const containerDiv = document.createElement('div')
        containerDiv.style.display = 'flex'
        containerDiv.style.flexDirection = 'row'

        // Create colored divs
        colorPalette.forEach((color) => {
            const div = document.createElement('div')
            div.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
            div.style.height = `${size}px`
            div.style.width = `${size}px`

            containerDiv.appendChild(div)
        })

        return containerDiv
    }
}