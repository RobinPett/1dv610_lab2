export class ImageToPixels {
    /**
     * Image to be loaded.
     */
    #imageURL

    /**
     * Image to be loaded.
     */
    #image

    /**
     * Image to be loaded.
     */
    #imageWidthInPx

    /**
     * Image to be loaded.
     */
    #imageHeightInPx

    /**
     * Image to be loaded.
     */
    #imageElement

    /**
     * Image to be loaded.
     */
    #canvasElement

    /**
     * Raw rgba values in an 8Bit array
     */
    #rgbaValues

    /**
     * A promise to see if image has loaded
     */
    #imageLoadPromise



    constructor (imageUrl) {
        this.#imageURL = imageUrl
        this.#imageLoadPromise = this.startImageExtraction()
    }

    async startImageExtraction() {
        this.#imageElement = await this.createImage(this.#imageURL)
        this.#canvasElement = this.createCanvasElement(this.#imageElement)
        this.#rgbaValues = this.extractRgbaValues(this.#canvasElement)
    }

    /**
     * Create an image element based on image url.
     */
    createImage() {
        // Create image element in DOM based on image input.
        console.log('Creates image element')

        return new Promise((resolve, reject) => {
            let imageElement = new Image()
            this.#imageElement = imageElement

            imageElement.src = this.#imageURL
            imageElement.crossOrigin = 'Anonymouse' // To allow loading images from cross origin sources

            imageElement.onload = (() => {
                console.log('Image loaded')
                this.#imageHeightInPx = imageElement.height
                this.#imageWidthInPx = imageElement.width
                resolve(imageElement)
            })

            imageElement.onerror = (error) => {
                reject(new Error('Failed to load image'))
            }
        })
    }

    createCanvasElement(imageElement) {
        console.log('Creating canvas')

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = this.#imageWidthInPx
        canvas.height = this.#imageHeightInPx
        context.drawImage(imageElement, 0, 0)
        return context
    }

    /**
     * Extracts the red, green, blue and alpha values from an image.
     *
     * @param {CanvasRenderingContext2D} context 
     */
    async extractRgbaValues(context) {
        console.log('Extracting rgab values')


        const imageData = context.getImageData(0, 0, this.#imageWidthInPx, this.#imageHeightInPx)
        const data = imageData.data

        const rawRgbaValues = new Uint8ClampedArray(this.#imageWidthInPx * this.#imageHeightInPx * 4)

        // Loop through rgba values in image data
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i]
            const green = data[i + 1]
            const blue = data[i + 2]
            const alpha = data[i + 3]

            // Move rgba values to new array
            rawRgbaValues[i] = red
            rawRgbaValues[i + 1] = green
            rawRgbaValues[i + 2] = blue
            rawRgbaValues[i + 3] = alpha
        }

        console.log(rawRgbaValues)
        return rawRgbaValues
    }

    async getRgbaValues() {
        await this.#imageLoadPromise
        return this.#rgbaValues
    }

    async getImageWidth() {
        await this.#imageLoadPromise
        return this.#imageWidthInPx
    }

    async getImageHeight() {
        await this.#imageLoadPromise
        return this.#imageHeightInPx
    }
}