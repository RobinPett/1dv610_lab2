// TODO
// 
// Rewrite for loops as forEach

// DOn't allow too small sets of data of pixels to be analysed




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

    /**
     * Frequent colors
     */
    #colorFrequencies

    constructor(rgbaValues, numberOfColorsToExtract) {
        if (numberOfColorsToExtract < 3 || numberOfColorsToExtract > 10) {
            throw new Error('A palette must be between 3 and 10 colors')
        }

        if (rgbaValues.length < 100) {
            throw new Error('Pixel data must be above 100 pixels - 10x10px')
        }

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
        // this.#referencePixels = this.getReferencePixels()
        this.#referencePixels = this.getInitialReferencePixels()
        console.log('Initial reference pixels: ' + this.#referencePixels)

        // Cluster together pixel to reference pixels
        this.addToColorCluster()

        // Loops over pixels and gets more accurate colors from image
        this.iterateOverPixels()
    }

    createColorClusters() {
        const colorClustersCollection = []
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const newCluster = []
            colorClustersCollection.push(newCluster)
        }
        return colorClustersCollection
    }

    getColorFrequencies() {
        const frequentPixels = []
        const threshold = 50

        this.#rgbaValues.forEach((pixel) => {
            let foundSimilarPixel = false

            const [red, green, blue, alpha] = pixel

            // Extract luminance == brightness
            // Reference = https://en.wikipedia.org/wiki/Luma_(video)
            const pixelBrightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255

            // Calculate saturation - min/max value of rgb /255 the bits
            const pixelSaturation = (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255

            // if (pixelBrightness < 0.5 || pixelSaturation < 0.5) return

            frequentPixels.forEach(pixelGroup => {
                const frequentPixel = pixelGroup.pixel
                const distance = this.calculateDistanceToReferencePixel(pixel, frequentPixel)
                
                if (distance < threshold) {
                    pixelGroup.count++
                    foundSimilarPixel = true
                }
            })

            if (!foundSimilarPixel) {
                frequentPixels.push({ pixel: pixel, count: 1 })
            }
        })

        const sortedFrequentPixels = frequentPixels.sort((a, b) => b.count - a.count)
        return sortedFrequentPixels
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

    getInitialReferencePixels() {
        const referencePixels = []

        // Get first pixels based on frequency of colors
        const colorFrequencies = this.getColorFrequencies()

        console.log('Color frequencies: ')
        console.log(colorFrequencies)

        // Extract most frequent colors as initial 
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            referencePixels.push(colorFrequencies[i].pixel)
        }

        return referencePixels
    }

    addToColorCluster() {
        for (let i = 0; i < this.#rgbaValues.length; i++) {
            const pixel = this.#rgbaValues[i] // A Pixel is an array of rgba values - [r, g, b, a]
            const meassuredDistances = []
            const threshold = 30

            // Calculate distance between pixel and reference pixels
            for (let i = 0; i < this.#referencePixels.length; i++) {
                const referencePixel = this.#referencePixels[i]
                const distance = this.calculateDistanceToReferencePixel(pixel, referencePixel)
                meassuredDistances.push(distance)
            }

            // Assign pixel to cluster afterwards
            const smalletNumber = Math.min(...meassuredDistances)
            const closestIndex = meassuredDistances.indexOf(smalletNumber)

            if (smalletNumber < threshold) {
                this.#colorClusters[closestIndex].push(pixel)
            }
            
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
        const threshold = 0.001

        updatedReferencePixels.forEach((pixel, index) => {
            const distance = this.calculateDistanceToReferencePixel(pixel, referencePixels[index])
            totalDistanceMoved += distance

            if (distance <= threshold) return false
        })
        return totalDistanceMoved < threshold
    }

    iterateOverPixels() {
        let convergence = false
        let iterations = 0
        const maxIterations = 1000
        do {
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

    getDominantColors() {
        const extractedColors = []

        for (let i = 0; i < this.#colorClusters.length; i++) {
            const color = this.#colorClusters[i][0]

            const red = color[0]
            const green = color[1]
            const blue = color[2]
            const alpha = color[3]

            // console.log(`Extracted colors: rgba(${red}, ${green}, ${blue}, ${alpha})`)

            const extractedColor = { red, green, blue, alpha }
            extractedColors.push(extractedColor)
        }

        return extractedColors
    }
}