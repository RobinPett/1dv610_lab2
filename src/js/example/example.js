/**
 * Example usage of Color-Palette-Extractor
 */

import {ColorPaletteExtractor} from '../index.js'

const imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'

const paletteExtractor = new ColorPaletteExtractor()

// Check speed of operation
let milliseconds = 0
setInterval(() => {
milliseconds ++ 
}, 0);

const image = paletteExtractor.loadImage(imageURL)
const pixels = await image.getPixels()

// Set number of colors in palette
const palette = paletteExtractor.startExtraction(pixels, 5)

// Get seperate color palettes
const extraxtedPalette = palette.getColorPalette()
// const darkPalette = palette.getDarkPalette()
// const brightPalette = palette.getBrightPalette()
// const mutedPalette = palette.getMutedPalette()

const colorPaletteDiv = paletteExtractor.presentColorPalette(extraxtedPalette, 100)

console.log('Time to calculate: ' + milliseconds + 'ms')
// const darkPalettedIV = paletteExtractor.presentColorPalette(darkPalette, 100)
// const brightPaletteDiv = paletteExtractor.presentColorPalette(brightPalette, 100)
// const mutedPaletteDiv = paletteExtractor.presentColorPalette(mutedPalette, 100)

// Create image
const imageElement = document.createElement('img')
imageElement.src = imageURL

// Present in your own html document
const body = document.querySelector('body')
body.append(imageElement)
body.append(colorPaletteDiv)