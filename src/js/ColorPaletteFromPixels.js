export class ColorPaletteFromPixels {
    /**
     * Raw rgba Values.
     */
    #rgbaValues

    /**
     * How many colors should be extracted from rgba values.
     */
    #numberOfColorsToExtract

    /**
     * How many colors should be extracted from rgba values.
     */
    #referencePixels

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
        this.#referencePixels = this.getReferencePixels()
        console.log(this.#referencePixels)

        // Cluster together pixel to reference pixels
        const colorClusters = this.createColorClusters()
    }

    /**
     * Gets random pixels from array of pixels based on numbers of colors to extract.
     *
     * @returns {Array} Random pixles.
     */
    getReferencePixels() {
        const randomPixels = []

        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const amountOfPixels = this.#rgbaValues.length
            const randomPixel = Math.floor(Math.random() * amountOfPixels)
            const chosenReferencePixel = this.#rgbaValues[randomPixel]
            randomPixels.push(chosenReferencePixel)
        }
        return randomPixels
    }

    createColorClusters() {
        for (let i = 0; i < 2; i++) {
            const pixel = this.#rgbaValues[i] // A Pixel is an array of rgba values - [r, g, b, a]

            this.#referencePixels.forEach(referencePixel => {
                this.calculateDistanceToReferencePixel(pixel, referencePixel)
            })
                // Calculate distance between pixel and reference pixels
                // Assign pixel to cluster afterwards
        }
    }

    calculateDistanceToReferencePixel(pixel, referencePixel) {
        console.log('pixel: ' + pixel)
        console.log('Reference Pixel: ' + referencePixel)
        
        const red = pixel[0]
        const green = pixel[1]
        const blue = pixel[2]
        const alpha = pixel[3]

        const referenceRed = referencePixel[0]
        const referenceGreen = referencePixel[1]
        const referenceBlue = referencePixel[2]
        const referenceAlpha = referencePixel[3]
        console.log('Original red: ' + red)
        console.log('Reference red: ' + referenceRed)

        const powerOfTwo = 2
        const redCalculation = Math.pow((red - referenceRed), powerOfTwo)
        const greenCalculation = Math.pow((green - referenceGreen), powerOfTwo)
        const blueCalculation = Math.pow((blue - referenceBlue), powerOfTwo)
        const alphaCalculation = Math.pow((alpha - referenceAlpha), powerOfTwo)
        console.log(redCalculation)
        
        const distanceCalculation = Math.sqrt((redCalculation + greenCalculation + blueCalculation + alphaCalculation))
        console.log(distanceCalculation)
    }
}