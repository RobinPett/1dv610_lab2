/**
 * Example usage of Color-Palette-Extractor
 */

import { ColorPaletteExtractor } from "./index.js"

// Test Images --------------------------------------------------------------------
let imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'
// imageURL = 'https://i.ibb.co/FhZVb9q/test.jpg' // Red green and blue test image
// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' // Black image
// imageURL = 'https://i.ibb.co/8NSZWDf/small-tets-image.jpg' // Small colorful image of houses
// imageURL = 'https://i.ibb.co/9TMJNdt/100x100-test.jpg' // 100x100
// imageURL = 'https://farm9.staticflickr.com/8410/30193245810_7b7ff74cd5.jpg'
// ---------------------------------------------------------------------------------------

const paletteExtractor = new ColorPaletteExtractor()

const image = paletteExtractor.loadImage(imageURL)
const pixels = await image.getPixels()

// Set number of colors in palette
const palette = paletteExtractor.startExtraction(pixels, 10)

// Get seperate color palettes
const extraxtedPalette = palette.getColorPalette()
const darkPalette = palette.getDarkPalette()
const brightPalette = palette.getBrightPalette()
const mutedPalette = palette.getMutedPalette()


const colorPaletteDiv = paletteExtractor.presentColorPalette(extraxtedPalette, 100)
const darkPalettedIV = paletteExtractor.presentColorPalette(darkPalette, 100)
const brightPaletteDiv = paletteExtractor.presentColorPalette(brightPalette, 100)
const mutedPaletteDiv = paletteExtractor.presentColorPalette(mutedPalette, 100)

// Create image
const imageElement = document.createElement('img')
imageElement.src = imageURL

// Present in your own html document
const body = document.querySelector('body')
body.append(imageElement)
body.append(colorPaletteDiv)
body.append(darkPalettedIV)
body.append(brightPaletteDiv)
body.append(mutedPaletteDiv)