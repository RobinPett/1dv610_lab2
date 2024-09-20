// Main module file

import { CreateCanvas } from "./CreateCanvas.js"
import { ImageLoader } from "./ImageLoader.js"

let imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

imageURL = 'https://cdn.konst.se/konstverk/800/2501830840652.jpg'

console.log('Connected to browser')

const body = document.querySelector('body')

let response = await fetch(imageURL) 
let blob = await response.blob()

// create image element
const imageLoader = new ImageLoader(imageURL)
const image = await imageLoader.createImage()

console.log(image.width, image.height)

// Create canvas element with image
const canvas = new CreateCanvas(image)
const rgbaValues = canvas.getRgbaValues()

console.log(rgbaValues)

const canvasElement = document.createElement('canvas')
canvasElement.width = image.width
canvasElement.height = image.height
canvasElement.style.overflow = 'visible'
canvasElement.style.overflowClipMargin = 'unset'


const context = canvasElement.getContext('2d')
const imageData = new ImageData(rgbaValues, image.width, image.height)

console.log(imageData)

context.putImageData(imageData, 0, 0)

body.appendChild(canvasElement)
