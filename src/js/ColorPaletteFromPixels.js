export class ColorPaletteFromPixels {
    /**
     * Raw rgba Values.
     */
    #rgbaValues

    /**
     * How many colors should be extracted from rgba values.
     */
    #numberOfColorsToExtract

    constructor(rgbaValues, numberOfColorsToExtract) {
        this.#rgbaValues = rgbaValues
        this.#numberOfColorsToExtract = numberOfColorsToExtract
        this.findDominantColors()
    }

    /**
     * Using K-Clustering algorithm to find dominant clusters of similar colors.
     */
    findDominantColors () {
        console.log(this.#rgbaValues)
        console.log(this.#numberOfColorsToExtract)

        // K-cluster algorithm

        // Find K random pixels
        const randomPixels = this.getRandomPixels()
        console.log(randomPixels)

        

        for (let i = 0; i < this.#rgbaValues.length; i++) {
            const pixel = this.#rgbaValues[i] // A Pixel is an array with rgba values - [r, g, b, a]

            // Loop through each pixels values  
            for (let j = 0; j < pixel.length; j++) {
                const red = pixel[j]
                const green = pixel[j + 1]
                const blue = pixel[j + 2]
                const alpha = pixel[j + 3]
            }
        }
    }

    /**
     * Gets random pixels from array of pixels based on numbers of colors to extract.
     *
     * @returns {Array} Random pixles.
     */
    getRandomPixels() {
        const randomPixels = []

        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const amountOfPixels = this.#rgbaValues.length
            const randomPixel = Math.floor(Math.random() * amountOfPixels)
            randomPixels.push(randomPixel)
        }
        return randomPixels
    }
}