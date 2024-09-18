export class ImageLoader {
    /**
     * Image to be loaded.
     */
    #imageURL
    
    constructor(image) {
        this.#imageURL = image
        console.log(this.#imageURL)
    }

    createImage() {
        // Create image element in DOM based on image input.

        let imageElement = new Image()

        imageElement.onload = (() => {
            console.log('Height: '+ imageElement.naturalHeight)
            console.log('Width: ' + imageElement.naturalWidth)
        } )

        imageElement.src = this.#imageURL

        // const imageElement = document.createElement('img')
        // imageElement.setAttribute('src', this.#image)
        // console.log(imageElement.clientHeight)
        // console.log(imageElement)
    }

}