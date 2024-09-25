export class ImageLoader {
    /**
     * Image to be loaded.
     */
    #imageURL

    /**
     * Image to be loaded.
     */
    #imageElement



    constructor(image) {
        this.#imageURL = image
        console.log(this.#imageURL)
    }

    /**
     * Create an image element based on image url.
     */
    createImage() {
        // Create image element in DOM based on image input.

        return new Promise((resolve, reject) => {
            let imageElement = new Image()
            this.#imageElement = imageElement

            imageElement.src = this.#imageURL
            imageElement.crossOrigin = 'Anonymouse'

            imageElement.onload = (() => {
                console.log('Height: ' + imageElement.naturalHeight)
                console.log('Width: ' + imageElement.naturalWidth)
                resolve(imageElement)
            })

            imageElement.onerror = (error) => {
                reject(new Error('Failed to load image'))
            }
        })
    }



}