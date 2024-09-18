// Main module file

import { ImageLoader } from "./ImageLoader.js"
const imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

console.log('Connected to the web')

let response = await fetch(imageURL) 
let blob = await response.blob()

const imageFile = new File([blob], 'circle.png', {
    type: 'image/png'
})

const imageLoader = new ImageLoader(imageURL)

// create image element
imageLoader.createImage()




// const imageElement = document.createElement('img').setAttribute('src', image)