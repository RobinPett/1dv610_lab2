// Main module file
import { ColorPaletteFromPixels } from "./ColorPaletteFromPixels.js"
import { ImageToPixels } from "./ImageToPixels.js"

let imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'

console.log('Connected to browser')

const body = document.querySelector('body')

let response = await fetch(imageURL) 
let blob = await response.blob()

// extract rgba values from image
const imageToPixels = new ImageToPixels(imageURL)
const rgbaValues = await imageToPixels.getRgbaValues()

const numberofColorsInColorPalette = 3

const colorPaletteFromPixels = new ColorPaletteFromPixels(rgbaValues, numberofColorsInColorPalette)










// TEST RGBA -----------------------------------------------------------------------------
// Build canvas to test values
// const imageWidthinPx = await imageToPixels.getImageWidth()
// const imageHeightInPx = await imageToPixels.getImageHeight()

// // Build image from rgba values
// const canvasElement = document.createElement('canvas')
// const context = canvasElement.getContext('2d')
// canvasElement.height = imageHeightInPx
// canvasElement.width = imageWidthinPx
// const imageData = new ImageData(rgbaValues, imageWidthinPx, imageHeightInPx)

// context.putImageData(imageData, 0, 0)

// body.appendChild(canvasElement)
