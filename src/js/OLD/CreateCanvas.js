/**
 * Create canvas from image data.
 */

export class CreateCanvas {

    /**
     * HTML Image Element
     */
    #image

    /**
     * Red, Green, Blue and Alpha values stored as objects in an array
     * representing every pixel in an image.
     */
    #rgbaValues

    constructor(image) {
        console.log('Created canvas class')
        if (!image) {
            throw new Error('Enter a valid image element')
        }

        this.#image = image
        const canvasElement = this.createCanvasElement(image)
        this.#rgbaValues = this.extractRgbaValues(canvasElement)
    }

    createCanvasElement(image) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = this.#image.width
        canvas.height = this.#image.height

        context.drawImage(image, 0, 0)
        return context
    }

    /**
     * Extracts the red, green, blue and alpha values from an image.
     *
     * @param {CanvasRenderingContext2D} context 
     */
    extractRgbaValues(context) {
        const imageData = context.getImageData(0, 0, this.#image.width, this.#image.height)
        const data = imageData.data

        const rgbaValues = []

        const manipulatedRgbaValues = new Uint8ClampedArray(this.#image.width * this.#image.height * 4)

        // Loop through rgba values in image data
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i]
            const green = data[i + 1]
            const blue = data[i + 2]
            const alpha = data[i + 3]

            manipulatedRgbaValues[i] = red
            manipulatedRgbaValues[i + 1] = green 
            manipulatedRgbaValues[i + 2] = blue
            manipulatedRgbaValues[i + 3] = alpha
        }

        console.log(manipulatedRgbaValues)

        return manipulatedRgbaValues
    }

    getRgbaValues() {
        return this.#rgbaValues
    }
}