/**
 * Example usage of Color-Palette-Extractor
 */

import * as colorPaletteExtractor from './index.js'

// Test Images --------------------------------------------------------------------
let imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'
// imageURL = 'https://i.ibb.co/FhZVb9q/test.jpg' // Red green and blue test image
// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' // Black image
// imageURL = 'https://i.ibb.co/8NSZWDf/small-tets-image.jpg' // Small colorful image of houses
// imageURL = 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' // Cors image test
// ---------------------------------------------------------------------------------------

const image = colorPaletteExtractor.loadImage(imageURL)

const pixels = await image.getPixels()
const colorPalette = colorPaletteExtractor.initiateColorExtraction(pixels, 5)

// Get seperate color palettes
const extraxtedPalette = colorPalette.getColorPalette()
const darkPalette = colorPalette.getDarkPalette()
const brightPalette = colorPalette.getBrightPalette()
const mutedPalette = colorPalette.getMutedPalette()


const colorPaletteDiv = colorPaletteExtractor.presentColorPalette(extraxtedPalette, 100)

// Present in your own html document
const body = document.querySelector('body')
body.append(colorPaletteDiv)
