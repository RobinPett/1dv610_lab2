/**
 * Main module file for Color-Palette-Extractor
 */
import { ColorPaletteFromPixels } from "./ColorPaletteFromPixels.js"
import { ImageToPixels } from "./ImageToPixels.js"

// Test Images --------------------------------------------------------------------
let imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'
// imageURL = 'https://i.ibb.co/FhZVb9q/test.jpg' // Red green and blue test image
// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' // Black image
// imageURL = 'https://i.ibb.co/8NSZWDf/small-tets-image.jpg' // Small colorful image of houses
// imageURL = 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' // Cors image test
// ----------------------------------------------------------------------------------------

console.log('Color Palette Extractor connected to browser')

/**
 * 
 * @param {string} imageUrl - URL to image
 * @returns
 */
export function loadImage(imageUrl) {
    return new ImageToPixels(imageURL)
}

/**
 * Extracts dominant colors from pixel data representing an image:
 * [ { red, green, blue, alpha } ]
 * 
 * @param {Array} rgbaValues - Array of pixel data with rgba values. 
 * @param {number} numberOfColorsToExtract - How many colors in palette
 * @returns {object} - Extracted colors
 */
export function getColorPalette(rgbaValues, numberOfColorsToExtract) {
    const colorPaletteFromPixels = new ColorPaletteFromPixels(rgbaValues, numberOfColorsToExtract)
    const extractedColors = colorPaletteFromPixels.getDominantColors()
    return extractedColors
}

/**
 * Presents the color palette as colored divs.
 * Ignoring alpha channel. 
 * 
 * @param {Array} colorPalette - Array of color palette objects: { red, green, blue, alpha }
 * @param {number} size - Size of each square div in px. 
 * @returns {HTMLDivElement} - Color Palette container div.
 */
export function presentColorPalette(colorPalette, size) {
    size ? size = size : 100
    
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



// Example usage ------------------------------------------------------

const image = loadImage(imageURL)

const pixels = await image.getPixels()
const imageHeight = await image.getHeightInPx()
const imageWidth = await image.getWidthInPx()
const imageElement = await image.getImageElement()

const colorPalette = getColorPalette(pixels, 5)

const colorPaletteDiv = presentColorPalette(colorPalette, 100)

// Present in your own html document
const body = document.querySelector('body')
body.append(imageElement)
body.append(colorPaletteDiv)

// TODO ?
// getMutedColorPalette()
// getBrightColorPalette()


// Test logs
console.log('Loaded image: ')
console.log(image)

console.log('Image Height: ' + imageHeight)
console.log('Image Width: ' + imageWidth)

console.log('Pixels: ')
console.log(pixels)

console.log('Color palette: ')
console.log(colorPalette)