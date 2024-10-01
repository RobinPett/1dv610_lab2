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
     * Type of palette - Bright, Dark, Muted
     */
    #colorPaletteType
    

    constructor(rgbaValues, numberOfColorsToExtract) {
        if (numberOfColorsToExtract < 3 || numberOfColorsToExtract > 10) {
            throw new Error('A palette must be between 3 and 10 colors')
        }

        if (rgbaValues.length < 100) {
            throw new Error('Pixel data must be above 100 pixels - 10x10px')
        }

        console.log(rgbaValues.length)

        if (rgbaValues.length > 100000) {
            this.#rgbaValues = this.reducePixels(rgbaValues)
        } else {
            this.#rgbaValues = rgbaValues
        }

        console.log(this.#rgbaValues.length)

        
        this.#numberOfColorsToExtract = numberOfColorsToExtract
    }

    /**
     * Using K-Clustering algorithm to find dominant clusters of similar colors.
     * Reference: https://en.wikipedia.org/wiki/K-means_clustering#Algorithms
     */
    findDominantColors() {
        // Create Color clusters based on amountOfColorsToExtract
        this.#colorClusters = this.createColorClusters()

        // Find reference pixels for clusters
        this.#referencePixels = this.getInitialReferencePixels()

        // Cluster together pixel to reference pixels
        this.addToColorCluster()

        // Loops over pixels and gets more accurate colors from image
        this.iterateOverPixels()
    }

    /**
     * Reduce amount of pixels for efficiency.
     * @param {Array} rgbaValues 
     * @returns {Array} - Reduced pixels
     */
    reducePixels(rgbaValues) {
        const reducedPixels = []

        // Skip every 10th pixel
        for (let i = 0; i < rgbaValues.length; i+=5) {
            const pixel = rgbaValues[i]
            reducedPixels.push(pixel)
        }

        return reducedPixels
    }

    /**
     * Creates an empty cluster (array) for each color to extract.
     * @returns 
     */
    createColorClusters() {
        const colorClustersCollection = []
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            const newCluster = []
            colorClustersCollection.push(newCluster)
        }
        return colorClustersCollection
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

    clearClusters() {
        this.#colorClusters.forEach(cluster => {
            cluster.length = 0
        })
    }

    getInitialReferencePixels() {
        const referencePixels = []

        // Get fmost frequent colors
        const colorFrequencies = this.getColorFrequencies()

        // Extract most frequent colors as initial 
        for (let i = 0; i < this.#numberOfColorsToExtract; i++) {
            referencePixels.push(colorFrequencies[i].pixel)
        }

        return referencePixels
    }

    getColorFrequencies() {
        const frequentPixels = []
        const threshold = 30

        console.log(this.#rgbaValues)

        // function - Group together pixels
        this.#rgbaValues.forEach((pixel) => {
            let foundSimilarPixel = false
            const [red, green, blue, alpha] = pixel


            // Calculate luminance (brightness) from rgb - https://en.wikipedia.org/wiki/Luma_(video)
            const pixelBrightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255

            // Calculate saturation - min/max value of rgb /255 the bits
            const pixelSaturation = (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255

            const pixelValues = { pixelBrightness, pixelSaturation }
            
            if (this.isPixelBrightAndSaturatedEnough(pixelValues)) {
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
            }
        })

        const sortedFrequentPixels = frequentPixels.sort((a, b) => b.count - a.count)
        return sortedFrequentPixels
    }

    isPixelBrightAndSaturatedEnough(pixelValues) {
            const {pixelBrightness, pixelSaturation} = pixelValues

            if(!this.#colorPaletteType) return true

            // Disregard pixels that are too bright or too dark basde on type
            if (this.#colorPaletteType === 'bright') {
                if (pixelBrightness < 0.5 || pixelSaturation < 0.5) return false
            } 

            if (this.#colorPaletteType === 'dark') {
                if (pixelBrightness > 0.5 || pixelSaturation > 0.5) return false
            } 
            
            if (this.#colorPaletteType === 'muted') {
                if (pixelBrightness < 0.5 || pixelSaturation > 0.5) return false
            }

            return true // Pixel is bright and saturaded enough
    }

    calculateDistanceToReferencePixel(pixel, referencePixel) {

        const [ red, green, blue, alpha ] = pixel
        const [ referenceRed, referenceGreen, referenceBlue, referenceAlpha ] = referencePixel

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

    iterateOverPixels() {
        let convergence = false
        let iterations = 0
        const maxIterations = 100
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

    /**
     * Extracts a colorPalette based on type:
     * Types: default, bright, dark.
     * 
     * @param {string} type - Type of palette to extract.
     */
    getColorPalette() {
        this.findDominantColors()

        const extractedColors = []

        for (let i = 0; i < this.#colorClusters.length; i++) {
            const color = this.#colorClusters[i][0]

            const [red, green, blue, alpha] = color

            const extractedColor = { red, green, blue, alpha }
            extractedColors.push(extractedColor)
        }

        return extractedColors

    }

    getMutedPalette() {
        this.#colorPaletteType = 'muted'
        return this.getColorPalette()
    }

    getDarkPalette() {
        this.#colorPaletteType = 'dark'
        return this.getColorPalette()
    }

    getBrightPalette() {
        this.#colorPaletteType = 'bright'
        return this.getColorPalette()
    }
}