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
        // console.log(this.#rgbaValues)
        // console.log(this.#numberOfColorsToExtract)

        // Testing! - Draw out pixels from raw data
        const rawPixels = []

        for (let i = 0; i < 1; i++) {
            const pixel = this.#rgbaValues[i] // pixel is an array with rgba values - [r, g, b, a]
            console.log(pixel)
            // for (let j = 0; j < pixel.length; j++) {
            //     const colorValue = pixel[j]
            //     rawPixels.push(colorValue)
            // }
        }

        console.log(rawPixels)
    }
}