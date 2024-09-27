// Main module file
import { ColorPaletteFromPixels } from "./ColorPaletteFromPixels.js"
import { ImageToPixels } from "./ImageToPixels.js"

let imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'

// imageURL = 'https://i.ibb.co/FhZVb9q/test.jpg' // Red green and blue test image

// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg' // Black image

// imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Puesta_de_sol%2C_Tok%2C_Alaska%2C_Estados_Unidos%2C_2017-08-28%2C_DD_189-191_HDR.jpg/640px-Puesta_de_sol%2C_Tok%2C_Alaska%2C_Estados_Unidos%2C_2017-08-28%2C_DD_189-191_HDR.jpg'

console.log('Connected to browser')

const body = document.querySelector('body')
const img = document.createElement('img')
img.src = imageURL
img.style.width = 500

body.appendChild(img)

let response = await fetch(imageURL)
let blob = await response.blob()

// extract rgba values from image
const imageToPixels = new ImageToPixels(imageURL)
const rgbaValues = await imageToPixels.getRgbaValues()

const numberofColorsInColorPalette = 3

const redPixel = [255, 0, 0, 255]
const greenPixel = [0, 255, 0, 255]
const bluePixel = [0, 0, 255, 255]

const pixels = [redPixel, greenPixel, bluePixel]

// const rgbaValues = []

for (let i = 0; i < 100; i++) {
    pixels.forEach(pixel => {
        rgbaValues.push(pixel)
    })
}

console.log(rgbaValues)

const colorPaletteFromPixels = new ColorPaletteFromPixels(rgbaValues, numberofColorsInColorPalette)

const extractedColors = colorPaletteFromPixels.getDominantColors()

console.log(extractedColors)

// Create divs with color info extracted
extractedColors.forEach((color) => {
    const div = document.createElement('div')
    div.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
    div.style.height = '100px'
    div.style.width = '100px'

    body.appendChild(div)
})












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
