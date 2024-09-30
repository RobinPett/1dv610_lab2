/**
 * Main module file for Color-Palette-Extractor
 */
import { ColorPaletteFromPixels } from "./ColorPaletteFromPixels.js"
import { ImageToPixels } from "./ImageToPixels.js"

let imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'

// imageURL = 'https://i.ibb.co/FhZVb9q/test.jpg' // Red green and blue test image

// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' // Black image

// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Puesta_de_sol%2C_Tok%2C_Alaska%2C_Estados_Unidos%2C_2017-08-28%2C_DD_189-191_HDR.jpg/640px-Puesta_de_sol%2C_Tok%2C_Alaska%2C_Estados_Unidos%2C_2017-08-28%2C_DD_189-191_HDR.jpg'

// imageURL = 'https://i.ibb.co/9rDyJzT/color-Test.jpg'

// imageURL = 'https://i.ibb.co/8NSZWDf/small-tets-image.jpg'


// ----------------------------------------------------------------------------------------

console.log('Color Palette Extractor connected to browser')

// const body = document.querySelector('body')
// const img = document.createElement('img')
// img.src = imageURL
// img.style.width = 500

// body.appendChild(img)

// extract rgba values from image

/**
 * Load an image and create
 * @param {string} imageUrl - URL to image
 * @returns
 */
export function extractPixelsFromImage(imageUrl) {
    const imageToPixels = new ImageToPixels(imageURL)
    return imageToPixels
}

export async function getRgbaValues(imageToPixels) {
    const rgbaValues = await imageToPixels.getRgbaValues()
    return rgbaValues
}

export function getColorPalette(rgbaValues, numberOfColorsToExtract) {
    const colorPaletteFromPixels = new ColorPaletteFromPixels(rgbaValues, numberOfColorsToExtract)
    const extractedColors = colorPaletteFromPixels.getDominantColors()
    return extractedColors
}

// Example usage

const imageToPixels = extractPixelsFromImage(imageURL)
console.log('Image to pixels: ')
console.log(imageToPixels)

const pixels = await imageToPixels.getRgbaValues()
console.log('Pixels: ')
console.log(pixels)

const colorPalette = getColorPalette(pixels, 5)
console.log('Color palette: ')
console.log(colorPalette)



// Create divs with color info extracted
// extractedColors.forEach((color) => {
//     const div = document.createElement('div')
//     div.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
//     div.style.height = '100px'
//     div.style.width = '100px'

//     body.appendChild(div)
// })
