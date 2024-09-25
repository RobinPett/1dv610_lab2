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

    /**
     * Color cluster - Collection of similar pixels
     */
    #colorClusters

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

        // Create Color clusters based on amountOfColorsToExtract
        this.#colorClusters = this.createColorClusters()
        console.log(this.#colorClusters)

        // Find K random pixels
        this.#referencePixels = this.getReferencePixels()
        console.log(this.#referencePixels)

        // Add reference pixels to each cluster
        this.addReferencePixelsToCluster()
        console.log(this.#colorClusters)

        // Cluster together pixel to reference pixels
        this.addToColorCluster()
        console.log(this.#colorClusters)
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
        const colorClustersCollection = []
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const newCluster = []
            colorClustersCollection.push(newCluster)
        }
        return colorClustersCollection
    }

    addReferencePixelsToCluster() {
        for (let i = 0; i < this.#referencePixels.length; i++) {
            this.#colorClusters[i].push(this.#referencePixels[i])
        }
    }

    addToColorCluster() {
        for (let i = 0; i < this.#rgbaValues.length; i++) {
            const pixel = this.#rgbaValues[i] // A Pixel is an array of rgba values - [r, g, b, a]
            const meassuredDistances = []

            // Calculate distance between pixel and reference pixels
            for (let i = 0; i < this.#referencePixels.length; i++) {
                const referencePixel = this.#referencePixels[i]
                const distance = this.calculateDistanceToReferencePixel(pixel, referencePixel)
                meassuredDistances.push(distance)
            }

            // Assign pixel to cluster afterwards
            const smalletNumber = Math.min(...meassuredDistances)
            const closestIndex = meassuredDistances.indexOf(smalletNumber)

            this.#colorClusters[closestIndex].push(pixel)
        }
    }

    calculateDistanceToReferencePixel(pixel, referencePixel) {
        const red = pixel[0]
        const green = pixel[1]
        const blue = pixel[2]
        const alpha = pixel[3]

        const referenceRed = referencePixel[0]
        const referenceGreen = referencePixel[1]
        const referenceBlue = referencePixel[2]
        const referenceAlpha = referencePixel[3]

        const powerOfTwo = 2
        const redCalculation = Math.pow((red - referenceRed), powerOfTwo)
        const greenCalculation = Math.pow((green - referenceGreen), powerOfTwo)
        const blueCalculation = Math.pow((blue - referenceBlue), powerOfTwo)
        const alphaCalculation = Math.pow((alpha - referenceAlpha), powerOfTwo)
        
        const distanceCalculation = Math.sqrt((redCalculation + greenCalculation + blueCalculation + alphaCalculation))

        return distanceCalculation
    }
}