// Main module file

import { CreateCanvas } from "./CreateCanvas.js"
import { ImageLoader } from "./ImageLoader.js"
const imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

console.log('Connected to browser')

let response = await fetch(imageURL) 
let blob = await response.blob()

const imageFile = new File([blob], 'circle.png', {
    type: 'image/png'
})

// create image element
const imageLoader = new ImageLoader(imageURL)
const image = imageLoader.createImage()

// Create canvas element with image
const canvas = new CreateCanvas(image)
const canvasElement = canvas.createCanvasElement()
    


// const imageElement = document.createElement('img').setAttribute('src', image)