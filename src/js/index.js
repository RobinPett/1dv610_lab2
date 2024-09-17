// Main module file
const imageURL = "https://i.ibb.co/syRwkSk/Cirkel.png"

let response = await fetch(imageURL) 
let blob = await response.blob()

const imageFile = new File([blob], 'circle.png', {
    type: 'image/png'
})

console.log(imageFile)

// const imageElement = document.createElement('img').setAttribute('src', image)