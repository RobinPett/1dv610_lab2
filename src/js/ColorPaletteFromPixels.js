// TODO
// 
// Rewrite for loops as forEach




/**
 * Extract dominant colors from a set of pixels.
 * Iterates over pixels and sorts into clusters of similar colors. 
 */
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
    findDominantColors() {
        // Create Color clusters based on amountOfColorsToExtract
        this.#colorClusters = this.createColorClusters()

        // Find K random pixels
        this.#referencePixels = this.getReferencePixels()
        console.log('Initial reference pixels: ' + this.#referencePixels)

        // Cluster together pixel to reference pixels
        this.addToColorCluster()



        // LOOP FROM HERE ----------------------------------------------------
        // let counter = 100 // replace with convergence check instead
        let convergence = false
        let iterations = 0
        const maxIterations = 1000
        do {
            console.log(iterations)
            iterations++
            const updatedReferencePixels = this.getUpdatedReferencePixels()

            // Check if pixels don't change no more - Convergence
            convergence = this.checkConvergence(updatedReferencePixels, this.#referencePixels)

            this.#referencePixels = updatedReferencePixels


            this.clearClusters()

            // Create Color clusters based on amountOfColorsToExtract
            this.#colorClusters = this.createColorClusters()

            // Cluster together pixel to reference pixels
            this.addToColorCluster()
        } while (!convergence && iterations < maxIterations)
    }

    createColorClusters() {
        const colorClustersCollection = []
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const newCluster = []
            colorClustersCollection.push(newCluster)
        }
        return colorClustersCollection
    }

    /**
     * Gets random pixels from array based on numbers of colors to extract.
     *
     * @returns {Array} Random pixles.
     */
    getReferencePixels() {
        const referencePixels = []
        const amountOfPixels = this.#rgbaValues.length

        // Get first pixel randomly
        const randomPixelIndex = Math.floor(Math.random() * amountOfPixels)
        const randomPixel = this.#rgbaValues[randomPixelIndex]
        referencePixels.push(randomPixel)

        for (let i = 1; i < this.#numberOfColorsToExtract; i++) {
            let maxDistanceOfPixel = 0
            let pixelFurthestAway = null

            // Get rest of pixels with k-mean++ logic - Calculated distance to others for better spread
            this.#rgbaValues.forEach((pixel) => {
                const pixelDistanceMoved = referencePixels.map((referencePixel) => this.calculateDistanceToReferencePixel(pixel, referencePixel))
                const minimumDistanceMoved = Math.min(...pixelDistanceMoved)

                if (minimumDistanceMoved > maxDistanceOfPixel) {
                    maxDistanceOfPixel = minimumDistanceMoved
                    pixelFurthestAway = pixel
                }
            })
            referencePixels.push(pixelFurthestAway)
        }
        return referencePixels
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

    getUpdatedReferencePixels() {
        const updatedReferencePixels = []

        // Loop through each cluster and then each pixel in cluster
        this.#colorClusters.forEach(colorCluster => {
            const clusterLength = colorCluster.length

            // Initialize sums
            let redSum = 0
            let greenSum = 0
            let blueSum = 0
            let alphaSum = 0

            colorCluster.forEach(pixel => {
                redSum += pixel[0]
                greenSum += pixel[1]
                blueSum += pixel[2]
                alphaSum += pixel[3]
            })

            const redMean = Math.max(0, Math.min(255, redSum / clusterLength))
            const greenMean = Math.max(0, Math.min(255, greenSum / clusterLength))
            const blueMean = Math.max(0, Math.min(255, blueSum / clusterLength))
            const alphaMean = Math.max(0, Math.min(255, alphaSum / clusterLength))


            const newReferencePixel = [redMean, greenMean, blueMean, alphaMean]
            updatedReferencePixels.push(newReferencePixel)
        })

        return updatedReferencePixels
    }

    clearClusters() {
        this.#colorClusters.forEach(cluster => {
            cluster.length = 0
        })
    }

    checkConvergence(updatedReferencePixels, referencePixels) {
        const meassuredDistances = []
        let totalDistanceMoved = 0
        const threshold = 0.1

        updatedReferencePixels.forEach((pixel, index) => {
            const distance = this.calculateDistanceToReferencePixel(pixel, referencePixels[index])
            console.log('Pixel distance moved: ' + distance)
            totalDistanceMoved += distance

            if (distance <= threshold) return false
        })

        console.log('Total distance moved: ' + totalDistanceMoved + ' threshold: ' + (threshold))

        return totalDistanceMoved < threshold
    }

    getDominantColors() {
        console.log('Color clusters before drawing palette')
        console.log(this.#colorClusters)

        const extractedColors = []

        for (let i = 0; i < this.#colorClusters.length; i++) {
            const color = this.#colorClusters[i][0]
            console.log('Color: ' + color)

            const red = color[0]
            const green = color[1]
            const blue = color[2]
            const alpha = color[3]

            console.log(`Extracted colors: rgba(${red}, ${green}, ${blue}, ${alpha})`)

            const extractedColor = { red, green, blue, alpha }
            extractedColors.push(extractedColor)
        }

        return extractedColors
    }
}